import { GetMovieMetadataUseCase } from '@domain/useCases/movies/GetMovieMetadataUseCase'
import { GetConfigurationUseCase } from '@domain/useCases/settings/GetConfigurationUseCase'
import { SaveConfigurationUseCase } from '@domain/useCases/settings/SaveConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '@domain/useCases/settings/SelectLibraryFolderUseCase'
import { GetLocalMoviePosterUseCase } from '@domain/useCases/movies/GetLocalMoviePosterUseCase'
import { DownloadMoviePosterFromTMDBUseCase } from '@domain/useCases/movies/DownloadMoviePosterFromTMDBUseCase'
import { OpenMovieInExplorerUseCase } from '@domain/useCases/movies/OpenMovieInExplorerUseCase'
import { ListMoviesByTitleOnDBUseCase } from '@domain/useCases/movies/ListMoviesByTitleOnDBUseCase'
import { CleanLocalMovieWithSelectedMovieUseCase } from '@domain/useCases/movies/CleanLocalMovieWithSelectedMovieUseCase'
import { SearchAndAddNewMoviesUseCase } from '@domain/useCases/movies/SearchAndAddNewMoviesUseCase'
import { ChangeLocaleUseCase } from '@domain/useCases/settings/ChangeLocaleUseCase'

export interface ComAdapterPort {
  startPingRouter(): void
  startSaveConfiguration(
    saveConfigurationUseCase: SaveConfigurationUseCase
  ): void
  startGetConfiguration(getConfigurationUseCase: GetConfigurationUseCase): void
  startSelectLibraryFolder(
    selectLibraryFolderUseCase: SelectLibraryFolderUseCase
  ): void
  startGetMovieMetadata(getMovieMetadataUseCase: GetMovieMetadataUseCase): void
  startGetMovieImage(
    getLocalMoviePosterUseCase: GetLocalMoviePosterUseCase
  ): void
  startGetRelatedMoviesFromDB(
    listMoviesByTitleOnDBUseCase: ListMoviesByTitleOnDBUseCase
  ): void
  startCleanLocalMovie(
    cleanLocalMovieWithSelectedMovieUseCase: CleanLocalMovieWithSelectedMovieUseCase
  ): void
  startSearchNewMovies(searchNewMovies: SearchAndAddNewMoviesUseCase): void
  startGetMoviePosterBuffer(
    downloadMoviePosterFromTMDBUseCase: DownloadMoviePosterFromTMDBUseCase
  ): void
  startOpenMovieInExplorer(
    openMovieInExplorerUseCase: OpenMovieInExplorerUseCase
  ): void
  startChangeLocale(changeLocaleUseCase: ChangeLocaleUseCase): void
}
