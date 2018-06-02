import { Injectable, TemplateRef } from '@angular/core';
import { DataRetrieverService } from '../shared/services/data-retriever.service';
import { CoreService } from '../shared/services/core.service';
import { Subject } from 'rxjs/Subject';
import { Project } from './Models/project.model';
import { HttpErrorResponse } from '@angular/common/http';
import { ProjectFile } from './Models/project-file.model';
import { Folder } from './Models/folder.model';
import { FolderProjectFile } from './Models/folder-project-file.model';
import { BsModalRef, BsModalService } from 'ngx-bootstrap';

@Injectable()
export class ProjectsService {
  private _fullProjData: any[];
  private _projects: Project[];
  getProjectsAsync = new Subject<Project[]>();
  private _modalTemplateRef: TemplateRef<any>;
  private _modalRef: BsModalRef;
  private _currentModalProject: Project;
  private _modalConfig = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false
  };

  constructor(
    private _dataRetrieverService: DataRetrieverService,
    private _coreService: CoreService,
    private _modalService: BsModalService
  ) {
    this._projects = null;

    this._loadData();
    this._coreService.langUpdated.subscribe(
      (lang: string) => {
        this._projects = this._setProjects(this._fullProjData, lang);
        this.getProjectsAsync.next(this._projects);
      }
    );
  }

  // get Project data from the server
  private _loadData() {
    this._dataRetrieverService.importProjectData().subscribe(
      (rawProjects) => {
        this._fullProjData = rawProjects;
        this._projects = this._setProjects(rawProjects, this._coreService.getLang());
        this.getProjectsAsync.next(this._projects);
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('Client-side error occurred.');
        } else {
          console.log('Server-side error occurred.');
        }
      }
    );
  }

  // populate projects from complete data (all languages included)
  private _setProjects(fullData: any, lang: string): Project[] {
    const projects: Project[] = [];
    let project: Project, index = 0, projectFiles: ProjectFile[];

    for (const projectRef of fullData) {
      project = new Project(
        projectRef['id'],
        projectRef['extTableName'],
        projectRef['occId'],
        lang === 'eng' ? projectRef['title'] : projectRef['titoloIta'],
        lang === 'eng' ? projectRef['details'] : projectRef['dettagli'],
        projectRef['attachedFile'],
        projectRef['attachedImage'],
        projectFiles = this._setProjFiles(index, lang),
        this._setFoldersArray(projectFiles)
      );
      index ++;
      projects.push(project);
    }

    return projects;
  }

  setModalTemplateRef(modalTemplateRef: TemplateRef<any>) {
    this._modalTemplateRef = modalTemplateRef;
  }

  getProjects(): Project[] {
    return this._projects;
  }

  getModalTemplateRef() {
    return this._modalTemplateRef;
  }

  getModalRef() {
    return this._modalRef;
  }

  getCurrentModalProject() {
    return this._currentModalProject;
  }

  isProjects(): boolean {
    return this._projects !== null;
  }

  private _setProjFiles(projectPos: number, lang: string): ProjectFile[] {
    let projectFile: ProjectFile;
    let projectFiles: ProjectFile[] = [];

    for (const projFileRef of this._fullProjData[projectPos].projFiles) {
      projectFile = new ProjectFile(
        projFileRef['id'],
        lang === 'eng' ? projFileRef['title'] : projFileRef['titoloIta'],
        projFileRef['attachedFile'],
        projFileRef.attachedFile.split('/').length,
      );
      projectFiles.push(projectFile);
    }

    projectFiles = this._sortProjectFiles(projectFiles);
    return projectFiles;
  }

  // populate a tree-like array to keep track of the folder structure (levelling paths for recursion if needed.
  // 'assets/.../ngBackend/a' becomes 'ngBackend/a' in the recursive component)
  private _setFoldersArray(projectFiles: ProjectFile[]) {
    let pathLength: number, currentPathArray: string[], folderLevel: number, folderIndex = 0;
    const folders = [];
    for (const projFile of projectFiles) {
      currentPathArray = projFile.attachedFile.split('/');
      pathLength = currentPathArray.length;
      currentPathArray.splice(currentPathArray.length - 1, 1);
      currentPathArray.splice(0, 2);
      folderLevel = 0;
      for (const folderName of currentPathArray) {
        if (!this._isExistingFolderName(folderName, projFile.attachedFile, folders[folderLevel], folderLevel + 2)) {
          if (folderLevel === folders.length) {
            folders[folderLevel] =
              [new Folder(folderName, this.getFilelessPath(projFile.attachedFile), pathLength,
                this._setFiles(projectFiles, projFile.attachedFile, folderName, folderLevel))];
          } else {
            folders[folderLevel].push(
              new Folder(folderName, projFile.attachedFile, pathLength,
                this._setFiles(projectFiles, projFile.attachedFile, folderName, folderLevel))
            );
          }
        }
        folderLevel += 1;
      }
      folderIndex += 1;
    }
    return folders;
  }

  // set files for a given folder (levelling paths for recursion if needed. 'assets/.../ngBackend/a' becomes
  // 'ngBackend/a' in the recursive component)
  private _setFiles(
    projectFiles: ProjectFile[], currentPath: string, folderName: string, folderLevel: number): FolderProjectFile[] {
    let splitPath: string[];
    const files: FolderProjectFile[] = [];

    for (const projFile of projectFiles) {
      splitPath = projFile.attachedFile.split('/');
      splitPath.splice(splitPath.length - 1, 1);
      splitPath.splice(0, 2);
      if (splitPath[folderLevel] === folderName &&
        folderLevel === (splitPath.length - 1) &&
        this.isPathwayEqualUpToIndex(currentPath, projFile.attachedFile, folderLevel + 2)) {
        files.push(new FolderProjectFile(projFile.id, projFile.title, projFile.attachedFile));
      }
    }
    return files;
  }

  // check if the given folder name already exists in the array
  private _isExistingFolderName(
    folderName: string, folderPath: string, foldersArray: Folder[], horizontalIndex: number): boolean {
    if (!foldersArray) { return false; }
    for (const folder of foldersArray) {
      if (folder.name === folderName &&
        this.isPathwayEqualUpToIndex(folderPath, folder.folderPath, horizontalIndex)) {
        return true;
      }
    }
    return false;
  }

  // cycle the longest path horizontally while running a sorting algorithm
  private _sortProjectFiles(projectFiles: ProjectFile[]): ProjectFile[] {
    let horizontalIndex = 0;
    const longestPath = this._getLongestPath(projectFiles);
    while (horizontalIndex < longestPath) {
      projectFiles = this._innerSortProjectFiles(projectFiles, horizontalIndex);
      horizontalIndex += 1;
    }
    // projectFiles = this._innerSortAlphabetically(projectFiles);
    return projectFiles;
  }

  // get the longest existing path out of a projectFiles array
  private _getLongestPath(projectFiles: ProjectFile[]): number {
    let longestPath = 0;
    for (const projectFile of projectFiles) {
      if (projectFile.pathLength > longestPath) {
        longestPath = projectFile.pathLength;
      }
    }
    return longestPath;
  }

  // sort project file paths by folder depth
  private _innerSortProjectFiles(projectFiles: ProjectFile[], horizontalIndex: number): ProjectFile[] {
    return projectFiles.sort((a: ProjectFile, b: ProjectFile) => {
      const aSplit = a.attachedFile.split('/'), bSplit = b.attachedFile.split('/');
      let aString: string, bString: string;
      aString = this.pathFromStringArray(aSplit);
      bString = this.pathFromStringArray(bSplit);
      if (aSplit.length < bSplit.length &&
        this.isPathwayEqualUpToIndex(aString, bString, horizontalIndex)) {
        return 1;
      } else if (aSplit.length > bSplit.length &&
        this.isPathwayEqualUpToIndex(aString, bString, horizontalIndex)) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // return path without the file name at the end
  getFilelessPath(path: string, adaptToRecursion?: boolean): string {
    const pathSplit = path.split('/');
    if (adaptToRecursion) {
      pathSplit.splice(0, 2);
    }

    if (pathSplit[pathSplit.length - 1].indexOf('.') > -1) {
      pathSplit.splice(pathSplit.length - 1, 1);
    }
    const filelessString = this.pathFromStringArray(pathSplit);
    return filelessString;
  }

  // check if two pathways have the same root up to a certain index
  isPathwayEqualUpToIndex(aPath: string, bPath: string, currentHorizontalIndex: number) {
    const aSplit = aPath.split('/'), bSplit = bPath.split('/');
    let i = 0;
    while (aSplit[i] !== undefined &&
      bSplit[i] !== undefined &&
      (aSplit[i] === bSplit[i]) &&
    (i < currentHorizontalIndex)) { i += 1; }
    if (i === currentHorizontalIndex) {
      return true;
    } else {
      return false;
    }
  }

  // return path string from array of folder names
  pathFromStringArray(stringArray: string[]): string {
    let i = 0, composedString = '';
    while (i < stringArray.length) { composedString += stringArray[i] + '/'; i++; }
    composedString = composedString.substring(0, composedString.length - 1);
    return composedString;
  }

  // set modal options and set the ids (categoryId and occurrenceId) of the occurrence that called the modal
  openModal(project: Project) {
    this._currentModalProject = project;
    this._modalRef = this._modalService.show(
      this._modalTemplateRef,
      Object.assign({}, this._modalConfig, { class: 'gray modal-lg' })
    );
  }

}
