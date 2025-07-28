import { dialog } from 'electron'

export class SelectLibraryFolderUseCase {
  constructor() {}

  execute(): string | undefined {
    const folder = dialog.showOpenDialogSync({
      properties: ['openDirectory'],
    })
    return folder?.[0]
  }
}
