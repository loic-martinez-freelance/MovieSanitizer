import { ConfigurationPort } from '@domain/ports/ConfigurationPort'

export class FirstInitializationUseCase {
  constructor(private readonly configurationAdapter: ConfigurationPort) {}

  execute() {
    if (this.configurationAdapter.isFirstInitialization()) {
      this.configurationAdapter.initializeConfiguration()
    }
  }
}
