import { GetMovieMetadataUseCase } from '@domain/useCases/movies/getMovieMetadataUseCase'
import { GetConfigurationUseCase } from '../useCases/settings/getConfigurationUseCase'
import { SaveConfigurationUseCase } from '../useCases/settings/saveConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '../useCases/settings/selectLibraryFolderUseCase'
import { GetMovieImageUseCase } from '@domain/useCases/movies/getMovieImageUseCase'
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
}
