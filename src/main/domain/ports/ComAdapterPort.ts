import { GetMovieMetadataUseCase } from '@domain/useCases/movies/GetMovieMetadataUseCase'
import { GetConfigurationUseCase } from '../useCases/settings/GetConfigurationUseCase'
import { SaveConfigurationUseCase } from '../useCases/settings/SaveConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '../useCases/settings/SelectLibraryFolderUseCase'
import { GetMovieImageUseCase } from '@domain/useCases/movies/GetMovieImageUseCase'
import { OpenMovieInExplorerUseCase } from '@domain/useCases/movies/OpenMovieInExplorerUseCase'

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
  startGetMovieImage(getMovieImageUseCase: GetMovieImageUseCase): void
  startOpenMovieInExplorer(
    openMovieInExplorerUseCase: OpenMovieInExplorerUseCase
  ): void
}
