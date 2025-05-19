import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { InitializeNewLibraryUseCase } from '../movies/initializeNewLibrary'

export class FirstInitializationUseCase {
  constructor(
    private readonly configurationAdapter: ConfigurationPort,
    private readonly initializeNewLibraryUseCase: InitializeNewLibraryUseCase
  ) {}

  execute() {
    if (this.configurationAdapter.isFirstInitialization()) {
      this.configurationAdapter.initializeConfiguration()
      this.initializeNewLibraryUseCase.execute()
    }
  }
}
