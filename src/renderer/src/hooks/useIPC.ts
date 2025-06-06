// src/renderer/src/hooks/useIPC.ts
import { useState, useCallback } from 'react'
import type { Configuration } from '@domain/ports/dtos/Configuration'
import type { Movie, MovieFullMetadata } from '@domain/ports/dtos/Movie'

export const useIPC = () => {
  const [error, setError] = useState<Error | null>(null)
  const [loading, setLoading] = useState(false)

  const getConfiguration = useCallback(async (): Promise<Configuration> => {
    try {
      setLoading(true)
      const config =
        await window.electron.ipcRenderer.invoke('getConfiguration')
      return config
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }, [])

  const saveConfiguration = useCallback(
    async (config: Partial<Configuration>): Promise<void> => {
      try {
        setLoading(true)
        window.electron.ipcRenderer.send('saveConfiguration', config)
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const selectLibraryFolder = async () => {
    try {
      setLoading(true)
      const folder = await window.electron.ipcRenderer.invoke(
        'selectLibraryFolder'
      )
      return folder
    } catch (err) {
      setError(err as Error)
      throw err
    } finally {
      setLoading(false)
    }
  }

  return {
    error,
    loading,
    getConfiguration,
    saveConfiguration,
    selectLibraryFolder,
  }
}
