import { XMLParser } from 'fast-xml-parser'
import { MetadataAdapterPort } from '@domain/ports/MetadataAdapterPort'

export class NFOAdapter implements MetadataAdapterPort {
  parseContent(nfoContent: string) {
    const parser = new XMLParser({
      ignoreAttributes: false,
      attributeNamePrefix: '@_',
      isArray: (name) => {
        const arrayElements = [
          'genre',
          'tag',
          'country',
          'studio',
          'actor',
          'director',
          'credits',
        ]
        return arrayElements.includes(name)
      },
    })

    const parsedContent = parser.parse(nfoContent)

    if (!parsedContent.movie) {
      throw new Error('Invalid NFO file - missing movie tag')
    }

    const movie = parsedContent.movie

    // Ensure arrays are properly handled
    const ensureArray = (value: any) => {
      if (!value) return []
      return Array.isArray(value) ? value : [value]
    }

    // Process actors
    const actors = ensureArray(movie.actor).map((actor) => ({
      name: actor.name || '',
      role: actor.role || '',
      thumb: actor.thumb || '',
    }))

    return {
      title: movie.title || '',
      sortTitle: movie.sorttitle || '',
      originalTitle: movie.originaltitle || '',
      year: movie.year || '',
      rating: parseFloat(movie.rating) || 0,
      votes: parseInt(movie.votes) || 0,
      top250: parseInt(movie.top250) || 0,
      set: movie.set || '',
      plot: movie.plot || '',
      outline: movie.outline || '',
      tagline: movie.tagline || '',
      runtime: movie.runtime || '',
      thumb: movie.thumb || '',
      fanart: movie.fanart || '',
      mpaa: movie.mpaa || '',
      certification: movie.certification || '',
      id: movie.id || '',
      imdbId: movie.imdbid || movie.uniqueid?.imdb || '',
      tmdbId: movie.tmdbid || movie.uniqueid?.tmdb || '',
      trailer: movie.trailer || '',
      genres: ensureArray(movie.genre),
      tags: ensureArray(movie.tag),
      studios: ensureArray(movie.studio),
      countries: ensureArray(movie.country),
      directors: ensureArray(movie.director),
      writers: ensureArray(movie.credits),
      actors,
      dateAdded: movie.dateadded || '',
      fileInfo: movie.fileinfo
        ? {
            streamDetails: movie.fileinfo.streamdetails
              ? {
                  video: movie.fileinfo.streamdetails.video
                    ? {
                        codec: movie.fileinfo.streamdetails.video.codec || '',
                        aspect: movie.fileinfo.streamdetails.video.aspect || '',
                        width:
                          parseInt(movie.fileinfo.streamdetails.video.width) ||
                          0,
                        height:
                          parseInt(movie.fileinfo.streamdetails.video.height) ||
                          0,
                        durationInSeconds:
                          parseInt(
                            movie.fileinfo.streamdetails.video.durationinseconds
                          ) || 0,
                        stereoMode:
                          movie.fileinfo.streamdetails.video.stereomode || '',
                      }
                    : undefined,
                  audio: ensureArray(movie.fileinfo.streamdetails.audio).map(
                    (audio) => ({
                      codec: audio.codec || '',
                      language: audio.language || '',
                      channels: parseInt(audio.channels) || 0,
                    })
                  ),
                  subtitle: ensureArray(
                    movie.fileinfo.streamdetails.subtitle
                  ).map((subtitle) => ({
                    language: subtitle.language || '',
                  })),
                }
              : undefined,
          }
        : undefined,
    }
  }
}
