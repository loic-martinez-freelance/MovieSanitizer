import { Button } from '@/components/ui/button'
import { useEffect, useState } from 'react'
import type { Configuration } from '@domain/ports/dtos/Configuration'
import { Movie, MovieFullMetadata } from '@domain/ports/dtos/Movie'

const ipcRenderer = window.electron.ipcRenderer

function App() {
  const [configuration, setConfiguration] =
    useState<Partial<Configuration> | null>(null)
  const [movies, setMovies] = useState<Movie[]>([])
  const [selectedMovie, setSelectedMovie] = useState<{
    id: string
    metadata: MovieFullMetadata | undefined
  }>()

  useEffect(() => {
    if (configuration && configuration.movies) {
      setMovies(configuration.movies)
    }
  }, [configuration])

  const onSelectMovieClicked = async (movie: Movie) => {
    const fullMovie = await ipcRenderer.invoke(
      'getMovieMetadata',
      movie.relativePath
    )

    if (fullMovie) {
      const poster = await ipcRenderer.invoke(
        'getMovieImage',
        movie.relativePath
      )
      const posterBlob = new Blob([poster], { type: `image/jpeg` })
      const posterUrl = URL.createObjectURL(posterBlob)
      setSelectedMovie({
        id: movie.relativePath,
        metadata: { ...fullMovie, thumb: posterUrl },
      })
    } else {
      setSelectedMovie({ id: movie.relativePath, metadata: undefined })
    }
  }

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
      <div className="w-full flex gap-4">
        <div className="w-1/4">
          <ul className="space-y-1">
            {movies.map((m) => (
              <li
                key={m.relativePath}
                className="rounded-md border px-4 py-2 font-mono text-sm overflow-hidden text-ellipsis whitespace-nowrap"
              >
                <button onClick={() => onSelectMovieClicked(m)}>
                  {m.title}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-3/4">
          {selectedMovie && selectedMovie.metadata && (
            <div className="flex gap-4">
              <div>
                <img src={selectedMovie.metadata.thumb} />
              </div>
              <div>
                <h2 className="text-2xl">{selectedMovie.metadata.title}</h2>
                <h3 className="text-xl">{selectedMovie.metadata.tagline}</h3>
                <div className="flex w-full gap-1">
                  <div className="w-3/4">{selectedMovie.metadata.plot}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default App
