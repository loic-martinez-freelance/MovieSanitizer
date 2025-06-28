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

  toNFO(metadata: any): string {
    // Helper to escape XML special characters
    const escape = (str: string) =>
      str
        ? str.replace(
            /[<>&'\"]/g,
            (c) =>
              ({
                '<': '&lt;',
                '>': '&gt;',
                '&': '&amp;',
                "'": '&apos;',
                '"': '&quot;',
              })[c] || c
          )
        : ''

    // Helper to build array tags
    const arrayTags = (tag: string, arr: any[], fn: (item: any) => string) =>
      arr && arr.length
        ? arr.map((item) => `  <${tag}>${fn(item)}</${tag}>`).join('\n')
        : ''

    // Actors
    const actors =
      metadata.actors && metadata.actors.length
        ? metadata.actors
            .map((a: any) => {
              let body = `    <name>${escape(a.name)}</name>`
              if (a.role) body += `\n    <role>${escape(a.role)}</role>`
              if (a.thumb) body += `\n    <thumb>${escape(a.thumb)}</thumb>`
              return `  <actor>\n${body}\n  </actor>`
            })
            .join('\n')
        : ''

    // Audio
    const audio =
      metadata.fileInfo?.streamDetails?.audio &&
      metadata.fileInfo.streamDetails.audio.length
        ? metadata.fileInfo.streamDetails.audio
            .map(
              (a: any) =>
                `<codec>${escape(a.codec || '')}</codec><language>${escape(a.language || '')}</language><channels>${a.channels || ''}</channels>`
            )
            .map((body: string) => `<audio>${body}</audio>`) // no indent for nested
            .join('')
        : ''
    // Subtitle
    const subtitle =
      metadata.fileInfo?.streamDetails?.subtitle &&
      metadata.fileInfo.streamDetails.subtitle.length
        ? metadata.fileInfo.streamDetails.subtitle
            .map(
              (s: any) =>
                `<subtitle><language>${escape(s.language || '')}</language></subtitle>`
            )
            .join('')
        : ''
    // Video
    const video = metadata.fileInfo?.streamDetails?.video
      ? `<video><codec>${escape(metadata.fileInfo.streamDetails.video.codec || '')}</codec><aspect>${escape(metadata.fileInfo.streamDetails.video.aspect || '')}</aspect><width>${metadata.fileInfo.streamDetails.video.width || ''}</width><height>${metadata.fileInfo.streamDetails.video.height || ''}</height><durationinseconds>${metadata.fileInfo.streamDetails.video.durationInSeconds || ''}</durationinseconds><stereomode>${escape(metadata.fileInfo.streamDetails.video.stereoMode || '')}</stereomode></video>`
      : ''
    // Stream details
    const streamDetails =
      video || audio || subtitle
        ? `<streamdetails>${video}${audio}${subtitle}</streamdetails>`
        : ''
    // Fileinfo
    const fileInfo = streamDetails
      ? `<fileinfo>${streamDetails}</fileinfo>`
      : ''

    return `<movie>
  <title>${escape(metadata.title || '')}</title>
  <sorttitle>${escape(metadata.sortTitle || '')}</sorttitle>
  <originaltitle>${escape(metadata.originalTitle || '')}</originaltitle>
  <year>${escape(metadata.year || '')}</year>
  <rating>${metadata.rating ?? ''}</rating>
  <votes>${metadata.votes ?? ''}</votes>
  <top250>${metadata.top250 ?? ''}</top250>
  <set>${escape(metadata.set || '')}</set>
  <plot>${escape(metadata.plot || '')}</plot>
  <outline>${escape(metadata.outline || '')}</outline>
  <tagline>${escape(metadata.tagline || '')}</tagline>
  <runtime>${escape(metadata.runtime || '')}</runtime>
  <thumb>${escape(metadata.thumb || '')}</thumb>
  <fanart>${escape(metadata.fanart || '')}</fanart>
  <mpaa>${escape(metadata.mpaa || '')}</mpaa>
  <certification>${escape(metadata.certification || '')}</certification>
  <id>${escape(metadata.id || '')}</id>
  <imdbid>${escape(metadata.imdbId || '')}</imdbid>
  <tmdbid>${escape(metadata.tmdbId || '')}</tmdbid>
  <trailer>${escape(metadata.trailer || '')}</trailer>
  ${arrayTags('genre', metadata.genres || [], escape)}
  ${arrayTags('tag', metadata.tags || [], escape)}
  ${arrayTags('studio', metadata.studios || [], escape)}
  ${arrayTags('country', metadata.countries || [], escape)}
  ${arrayTags('director', metadata.directors || [], escape)}
  ${arrayTags('credits', metadata.writers || [], escape)}
${actors}
  <dateadded>${escape(metadata.dateAdded || '')}</dateadded>
  ${fileInfo}
</movie>`
  }
}
