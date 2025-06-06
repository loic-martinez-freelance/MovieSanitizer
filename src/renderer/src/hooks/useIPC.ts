// src/renderer/src/hooks/useIPC.ts
import { useState, useCallback } from 'react'
import type { Configuration } from '@domain/ports/dtos/Configuration'
import type { MovieFullMetadata } from '@domain/ports/dtos/Movie'

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

  const getMovieMetadata = useCallback(
    async (
      movieRelativePath: string
    ): Promise<MovieFullMetadata | undefined> => {
      try {
        setLoading(true)
        const metadata = await window.electron.ipcRenderer.invoke(
          'getMovieMetadata',
          movieRelativePath
        )
        return metadata
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getMovieImage = useCallback(
    async (movieRelativePath: string): Promise<string | undefined> => {
      try {
        setLoading(true)
        const imageBuffer = await window.electron.ipcRenderer.invoke(
          'getMovieImage',
          movieRelativePath
        )
        if (imageBuffer) {
          const blob = new Blob([imageBuffer], { type: 'image/jpeg' })
          return URL.createObjectURL(blob)
        }
        return undefined
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  const getRelatedMoviesFromDB = useCallback(
    async (
      title: string
    ): Promise<{ id: string; title: string; year: string }[]> => {
      try {
        setLoading(true)
        const movies = await window.electron.ipcRenderer.invoke(
          'getRelatedMoviesFromDB',
          title
        )
        return movies
      } catch (err) {
        setError(err as Error)
        throw err
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return {
    error,
    loading,
    getConfiguration,
    saveConfiguration,
    selectLibraryFolder,
    getMovieMetadata,
    getMovieImage,
    getRelatedMoviesFromDB,
  }
}
