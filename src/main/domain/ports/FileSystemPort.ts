export interface FileSystemPort {
  listFiles(path: string): string[]
  getFileContentAsString(filePath: string): string
  getFileContentAsBuffer(filePath: string): Buffer
  checkFileExists(filePath: string): boolean
}
