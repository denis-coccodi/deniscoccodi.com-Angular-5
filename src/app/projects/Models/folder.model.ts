import { FolderProjectFile } from './folder-project-file.model';

export class Folder {
  constructor(
    public name: string,
    public folderPath: string,
    public pathLength: number,
    public files: FolderProjectFile[]
  ) {}
}
