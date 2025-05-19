import { Button } from '@/components/ui/button'
import { useState } from 'react'
import type { Configuration } from '@domain/ports/dtos/Configuration'

const ipcRenderer = window.electron.ipcRenderer

function App() {
  const [configuration, setConfiguration] =
    useState<Partial<Configuration> | null>(null)

  return (
    <div className="flex flex-col gap-4 items-start">
      <h1>Hello World</h1>
      <Button
        onClick={() => {
          ipcRenderer.send('ping', 'Hello from renderer')
        }}
      >
        Ping Router
      </Button>
      <input type="text" value={configuration?.libraryPath} />
      <Button
        onClick={async () => {
          const folder = await ipcRenderer.invoke('selectLibraryFolder')
          setConfiguration({
            ...configuration,
            libraryPath: folder,
          })
        }}
      >
        Select Library Folder
      </Button>
      <Button
        onClick={async () => {
          const config = await ipcRenderer.invoke('getConfiguration')
          setConfiguration(config)
        }}
      >
        Get Configuration
      </Button>
      <Button
        onClick={() => {
          ipcRenderer.send('saveConfiguration', configuration)
        }}
      >
        Save Configuration
      </Button>
    </div>
  )
}

export default App
