export interface FileSystemPort {
  listFiles(path: string): string[]
  getFileContent(filePath: string): string
  checkFileExists(filePath: string): boolean
}
