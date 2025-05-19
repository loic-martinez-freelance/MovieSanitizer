export type Movie = {
  relativePath: string
  title: string
}

export type MovieWithMetadata = Movie & {
  metadata?: MovieFullMetadata
}

export type MovieFullMetadata = {
  title: string
  sortTitle?: string
  originalTitle?: string
  year?: string
  rating?: number
  votes?: number
  top250?: number
  set?: string
  plot?: string
  outline?: string
  tagline?: string
  runtime?: string
  thumb?: string
  fanart?: string
  mpaa?: string
  certification?: string
  id?: string
  imdbId?: string
  tmdbId?: string
  trailer?: string
  genres: string[]
  tags: string[]
  studios: string[]
  countries: string[]
  directors: string[]
  writers: string[]
  actors: {
    name: string
    role?: string
    thumb?: string
  }[]
  dateAdded?: string
  fileInfo?: {
    streamDetails?: {
      video?: {
        codec?: string
        aspect?: string
        width?: number
        height?: number
        durationInSeconds?: number
        stereoMode?: string
      }
      audio?: {
        codec?: string
        language?: string
        channels?: number
      }[]
      subtitle?: {
        language?: string
      }[]
    }
  }
}
