import https from 'https'
import http from 'http'
import { URL } from 'url'
import { HttpPort } from '@domain/ports/HttpPort'

export class HTTPAdapter implements HttpPort {
  async downloadFile(url: string): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const parsedUrl = new URL(url)
      const protocol = parsedUrl.protocol === 'https:' ? https : http
      protocol
        .get(url, (response) => {
          if (response.statusCode && response.statusCode >= 400) {
            return reject(
              new Error(`Failed to get '${url}' (${response.statusCode})`)
            )
          }
          const fileData: Buffer[] = []
          response.on('data', (chunk) => fileData.push(chunk))
          response.on('end', () => {
            const buffer = Buffer.concat(fileData)
            resolve(buffer)
          })
          response.on('error', reject)
        })
        .on('error', reject)
    })
  }
}
