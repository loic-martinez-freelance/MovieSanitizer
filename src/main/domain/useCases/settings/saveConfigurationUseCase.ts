import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { Configuration } from '@domain/ports/dtos/Configuration'
import { InitializeNewLibraryUseCase } from '../movies/InitializeNewLibraryUseCase'

export class SaveConfigurationUseCase {
  constructor(
    private readonly configurationAdapter: ConfigurationPort,
    private readonly initialiseNewLibraryUseCase: InitializeNewLibraryUseCase
  ) {}

  execute(configuration: Partial<Configuration>): void {
    const previousConfiguration = this.configurationAdapter.getConfiguration()
    this.configurationAdapter.saveConfiguration(configuration)
    if (previousConfiguration.libraryPath !== configuration.libraryPath) {
      this.initialiseNewLibraryUseCase.execute()
    }
  }
}
