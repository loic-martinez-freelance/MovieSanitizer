import { ipcMain } from 'electron'
import { ComAdapterPort } from '@domain/ports/ComAdapterPort'
import { SaveConfigurationUseCase } from '@domain/useCases/settings/SaveConfigurationUseCase'
import { GetConfigurationUseCase } from '@domain/useCases/settings/GetConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '@domain/useCases/settings/SelectLibraryFolderUseCase'
import { GetMovieMetadataUseCase } from '@domain/useCases/movies/GetMovieMetadataUseCase'
import { GetMovieImageUseCase } from '@domain/useCases/movies/GetMovieImageUseCase'
import { ListMoviesByTitleOnDBUseCase } from '@domain/useCases/movies/ListMoviesByTitleOnDBUseCase'
import { CleanLocalMovieWithSelectedMovieUseCase } from '@domain/useCases/movies/CleanLocalMovieWithSelectedMovieUseCase'
import { SearchAndAddNewMoviesUseCase } from '@domain/useCases/movies/SearchAndAddNewMoviesUseCase'
import { OpenMovieInExplorerUseCase } from '@domain/useCases/movies/OpenMovieInExplorerUseCase'
import { ChangeLocaleUseCase } from '@domain/useCases/settings/ChangeLocaleUseCase'

export class IPCRouterAdapter implements ComAdapterPort {
  constructor() {}

  startPingRouter() {
    ipcMain.on('ping', (_, arg) => {
      console.log(arg)
    })
  }

  startSaveConfiguration(saveConfigurationUseCase: SaveConfigurationUseCase) {
    ipcMain.on('saveConfiguration', (_, arg) => {
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
    ipcMain.handle('getMovieMetadata', async (_, movieRelativePath: string) => {
      const movie = getMovieMetadataUseCase.execute(movieRelativePath)
      return movie
    })
  }

  startGetMovieImage(getMovieImageUseCase: GetMovieImageUseCase) {
    ipcMain.handle('getMovieImage', async (_, movieRelativePath: string) => {
      const image = getMovieImageUseCase.execute(movieRelativePath)
      return image
    })
  }

  startGetRelatedMoviesFromDB(
    listMoviesByTitleOnDBUseCase: ListMoviesByTitleOnDBUseCase
  ) {
    ipcMain.handle('getRelatedMoviesFromDB', async (_, title: string) => {
      const movies = await listMoviesByTitleOnDBUseCase.execute(title)
      return movies
    })
  }

  startCleanLocalMovie(
    cleanLocalMovieWithSelectedMovieUseCase: CleanLocalMovieWithSelectedMovieUseCase
  ) {
    ipcMain.handle(
      'cleanLocalMovie',
      async (_, movieRelativePath: string, selectedMovieId: string) => {
        const result = await cleanLocalMovieWithSelectedMovieUseCase.execute(
          movieRelativePath,
          selectedMovieId
        )
        return result
      }
    )
  }

  startSearchNewMovies(searchNewMovies: SearchAndAddNewMoviesUseCase) {
    ipcMain.on('searchNewMovies', () => {
      searchNewMovies.execute()
    })
  }

  startOpenMovieInExplorer(
    openMovieInExplorerUseCase: OpenMovieInExplorerUseCase
  ) {
    ipcMain.handle(
      'openMovieInExplorer',
      async (_, movieRelativePath: string) => {
        openMovieInExplorerUseCase.execute(movieRelativePath)
      }
    )
  }

  startChangeLocale(changeLocaleUseCase: ChangeLocaleUseCase) {
    ipcMain.on('changeLocale', (_, locale: string) => {
      changeLocaleUseCase.execute(locale)
    })
  }
}
