import { ipcMain } from 'electron'
import { ComAdapterPort } from '@domain/ports/ComAdapterPort'
import { SaveConfigurationUseCase } from '@domain/useCases/settings/saveConfigurationUseCase'
import { GetConfigurationUseCase } from '@domain/useCases/settings/getConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '@domain/useCases/settings/selectLibraryFolderUseCase'
import { GetMovieMetadataUseCase } from '@domain/useCases/movies/getMovieMetadataUseCase'
import { GetMovieImageUseCase } from '@domain/useCases/movies/getMovieImageUseCase'
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

  startGetMovieMetadata(getMovieMetadataUseCase: GetMovieMetadataUseCase) {
    ipcMain.handle(
      'getMovieMetadata',
      async (event, movieRelativePath: string) => {
        const movie = getMovieMetadataUseCase.execute(movieRelativePath)
        return movie
      }
    )
  }

  startGetMovieImage(getMovieImageUseCase: GetMovieImageUseCase) {
    ipcMain.handle(
      'getMovieImage',
      async (event, movieRelativePath: string) => {
        const image = getMovieImageUseCase.execute(movieRelativePath)
        return image
      }
    )
  }
}
