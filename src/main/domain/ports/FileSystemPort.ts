export interface FileSystemPort {
  listFiles(path: string): string[]
  getFileContentAsString(filePath: string): string
  getFileContentAsBuffer(filePath: string): Buffer
  checkFileExists(filePath: string): boolean
  writeFile(filePath: string, content: string | Buffer): void
  mkdir(dirPath: string): void
  moveFile(srcPath: string, destPath: string): void
}
