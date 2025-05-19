import { ConfigurationPort } from '@/domain/ports/ConfigurationPort'
import { Configuration } from '@/domain/ports/dtos/Configuration'

export class SaveConfigurationUseCase {
  constructor(private readonly configurationAdapter: ConfigurationPort) {}

  execute(configuration: Partial<Configuration>): void {
    this.configurationAdapter.saveConfiguration(configuration)
  }
}
