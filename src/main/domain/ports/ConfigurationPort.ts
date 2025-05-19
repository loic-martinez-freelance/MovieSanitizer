import { Configuration } from './dtos/Configuration'

export interface ConfigurationPort {
  initializeConfiguration(): void
  isFirstInitialization(): boolean
  getConfiguration(): Configuration
  saveConfiguration(configuration: Partial<Configuration>): void
}
