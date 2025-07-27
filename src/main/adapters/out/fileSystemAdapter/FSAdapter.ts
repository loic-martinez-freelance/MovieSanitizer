import {
  readdirSync,
  readFileSync,
  existsSync,
  writeFileSync,
  mkdirSync,
  renameSync,
} from 'fs'
import { FileSystemPort } from '@domain/ports/FileSystemPort'
import { shell } from 'electron'
import path from 'path'

export class FSAdapter implements FileSystemPort {
  constructor() {}

  listFiles(basePath: string): string[] {
    try {
      const files = recursiveListFiles(basePath)
      return files
    } catch (error) {
      console.error(`Error reading directory ${basePath} recursively:`, error)
      return []
    }
  }

  getFileContentAsString(filePath: string): string {
    return readFileSync(filePath, 'utf8')
  }

  getFileContentAsBuffer(filePath: string): Buffer {
    const file = readFileSync(filePath)
    return file
  }

  checkFileExists(filePath: string): boolean {
    return existsSync(filePath)
  }

  writeFile(filePath: string, content: string | Buffer): void {
    writeFileSync(filePath, content)
  }

  mkdir(dirPath: string): void {
    if (!existsSync(dirPath)) {
      mkdirSync(dirPath, { recursive: true })
    }
  }

  moveFile(srcPath: string, destPath: string): void {
    renameSync(srcPath, destPath)
  }

  openFileInExplorer(filePath: string): void {
    shell.showItemInFolder(filePath)
  }
}

const recursiveListFiles = (
  basePath: string,
  subPath: string = ''
): string[] => {
  const entries = readdirSync(`${basePath}/${subPath}`, { withFileTypes: true })
  const files: string[] = []

  for (const entry of entries) {
    const fullPath = `${basePath}/${subPath}/${entry.name}`

    if (entry.isFile()) {
      files.push(subPath === '' ? entry.name : `${subPath}/${entry.name}`)
    } else if (entry.isDirectory()) {
      files.push(...recursiveListFiles(basePath, path.basename(fullPath)))
    }
  }

  return files
}
