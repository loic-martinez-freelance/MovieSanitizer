import { ConfigurationPort } from '@/domain/ports/ConfigurationPort'
import { Configuration } from '@/domain/ports/dtos/Configuration'

export class GetConfigurationUseCase {
  constructor(private readonly configurationAdapter: ConfigurationPort) {}

  execute(): Configuration {
    return this.configurationAdapter.getConfiguration()
  }
}
