import { ProjectFile } from './project-file.model';
import { Folder } from './folder.model';

export class Project {
  constructor(
    public id: string,
    public extTableName: string,
    public occId: string,
    public title: string,
    public details: string,
    public attachedFile: string,
    public attachedImage: string,
    public projFiles: ProjectFile[],
    public folders: Folder[][]
  ) {}
}
