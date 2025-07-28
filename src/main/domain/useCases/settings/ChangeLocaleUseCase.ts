import { ConfigurationPort } from '@domain/ports/ConfigurationPort'

export class ChangeLocaleUseCase {
  constructor(private readonly configurationAdapter: ConfigurationPort) {}

  execute(locale: string): void {
    this.configurationAdapter.saveConfiguration({ locale })
  }
}
