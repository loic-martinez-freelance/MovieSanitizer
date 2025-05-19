import { GetConfigurationUseCase } from '../useCases/settings/getConfigurationUseCase'
import { SaveConfigurationUseCase } from '../useCases/settings/saveConfigurationUseCase'
import { SelectLibraryFolderUseCase } from '../useCases/settings/selectLibraryFolderUseCase'
export interface ComAdapterPort {
  startPingRouter(): void
  startSaveConfiguration(
    saveConfigurationUseCase: SaveConfigurationUseCase
  ): void
  startGetConfiguration(getConfigurationUseCase: GetConfigurationUseCase): void
  startSelectLibraryFolder(
    selectLibraryFolderUseCase: SelectLibraryFolderUseCase
  ): void
}
