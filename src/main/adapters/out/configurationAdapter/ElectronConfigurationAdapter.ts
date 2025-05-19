import { ConfigurationPort } from '@domain/ports/ConfigurationPort'
import { Configuration } from '@domain/ports/dtos/Configuration'
import { app } from 'electron'
import path from 'path'
import fs from 'fs'

export class ElectronConfigurationAdapter implements ConfigurationPort {
  constructor() {}

  isFirstInitialization(): boolean {
    const userDataPath = app.getPath('userData')
    const configurationPath = path.join(userDataPath, 'configuration.json')
    return !fs.existsSync(configurationPath)
  }

  initializeConfiguration(): void {
    const userDataPath = app.getPath('userData')
    const configurationPath = path.join(userDataPath, 'configuration.json')
    if (!fs.existsSync(configurationPath)) {
      fs.writeFileSync(
        configurationPath,
        JSON.stringify({
          libraryPath: app.getPath('videos'),
          movies: [],
        })
      )
    }
  }

  getConfiguration(): Configuration {
    const userDataPath = app.getPath('userData')
    const configurationPath = path.join(userDataPath, 'configuration.json')
    const currentConfiguration = JSON.parse(
      fs.readFileSync(configurationPath, 'utf8')
    )
    return currentConfiguration
  }

  saveConfiguration(configuration: Partial<Configuration>): void {
    const userDataPath = app.getPath('userData')
    const configurationPath = path.join(userDataPath, 'configuration.json')

    const currentConfiguration = JSON.parse(
      fs.readFileSync(configurationPath, 'utf8')
    )
    const newConfiguration = {
      ...currentConfiguration,
      ...configuration,
    }

    fs.writeFileSync(configurationPath, JSON.stringify(newConfiguration))
  }
}
