import { ipcMain } from 'electron'
import { ComAdapterPort } from '@domain/ports/ComAdapterPort'
import { SaveConfigurationUseCase } from '@domain/useCases/settings/saveConfigurationUseCase'
import { GetConfigurationUseCase } from '@domain/useCases/settings/getConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '@domain/useCases/settings/selectLibraryFolderUseCase'
export class IPCRouterAdapter implements ComAdapterPort {
  constructor() {}

  startPingRouter() {
    ipcMain.on('ping', (event, arg) => {
      console.log(arg)
    })
  }

  startSaveConfiguration(saveConfigurationUseCase: SaveConfigurationUseCase) {
    ipcMain.on('saveConfiguration', (event, arg) => {
      saveConfigurationUseCase.execute(arg)
    })
  }

  startGetConfiguration(getConfigurationUseCase: GetConfigurationUseCase) {
    ipcMain.handle('getConfiguration', async () => {
      const configuration = getConfigurationUseCase.execute()
      return configuration
    })
  }

  startSelectLibraryFolder(
    selectLibraryFolderUseCase: SelectLibraryFolderUseCase
  ) {
    ipcMain.handle('selectLibraryFolder', async () => {
      const folder = selectLibraryFolderUseCase.execute()
      return folder
    })
  }
}
