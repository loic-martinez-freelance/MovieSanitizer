// src/renderer/src/hooks/useIPC.ts
import { useState, useCallback } from 'react'
import type { Configuration } from '@domain/ports/dtos/Configuration'
import type { MovieFullMetadata } from '@domain/ports/dtos/Movie'

export const useIPC = () => {
  const [error, setError] = useState<Error | null>(null)

  const getConfiguration = useCallback(async (): Promise<Configuration> => {
    try {
      const config =
        await window.electron.ipcRenderer.invoke('getConfiguration')
      return config
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [])

  const saveConfiguration = useCallback(
    async (config: Partial<Configuration>): Promise<void> => {
      try {
        window.electron.ipcRenderer.send('saveConfiguration', config)
      } catch (err) {
        setError(err as Error)
        throw err
      }
    },
    []
  )

  const changeLocale = useCallback(async (locale: string): Promise<void> => {
    try {
      window.electron.ipcRenderer.send('changeLocale', locale)
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [])

  const selectLibraryFolder = async () => {
    try {
      const folder = await window.electron.ipcRenderer.invoke(
        'selectLibraryFolder'
      )
      return folder
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }

  const getMovieMetadata = useCallback(
    async (
      movieRelativePath: string
    ): Promise<MovieFullMetadata | undefined> => {
      try {
        const metadata = await window.electron.ipcRenderer.invoke(
          'getMovieMetadata',
          movieRelativePath
        )
        return metadata
      } catch (err) {
        setError(err as Error)
        throw err
      }
    },
    []
  )

  const getMovieImage = useCallback(
    async (movieRelativePath: string): Promise<string | undefined> => {
      try {
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
      }
    },
    []
  )

  const getRelatedMoviesFromDB = useCallback(
    async (
      title: string
    ): Promise<{ id: string; title: string; year: string }[]> => {
      try {
        const movies = await window.electron.ipcRenderer.invoke(
          'getRelatedMoviesFromDB',
          title
        )
        return movies
      } catch (err) {
        setError(err as Error)
        throw err
      }
    },
    []
  )

  const cleanLocalMovie = useCallback(
    async (
      movieRelativePath: string,
      selectedMovieId: string
    ): Promise<void> => {
      try {
        await window.electron.ipcRenderer.invoke(
          'cleanLocalMovie',
          movieRelativePath,
          selectedMovieId
        )
      } catch (err) {
        setError(err as Error)
        throw err
      }
    },
    []
  )

  const searchAndAddNewMovies = useCallback(async (): Promise<void> => {
    try {
      window.electron.ipcRenderer.send('searchNewMovies')
    } catch (err) {
      setError(err as Error)
      throw err
    }
  }, [])

  const openMovieInExplorer = useCallback(
    async (movieRelativePath: string): Promise<void> => {
      try {
        await window.electron.ipcRenderer.invoke(
          'openMovieInExplorer',
          movieRelativePath
        )
      } catch (err) {
        setError(err as Error)
        throw err
      }
    },
    []
  )

  return {
    error,
    getConfiguration,
    saveConfiguration,
    changeLocale,
    selectLibraryFolder,
    getMovieMetadata,
    getMovieImage,
    getRelatedMoviesFromDB,
    cleanLocalMovie,
    searchAndAddNewMovies,
    openMovieInExplorer,
  }
}
