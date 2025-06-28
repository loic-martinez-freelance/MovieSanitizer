import { MovieFullMetadata } from './dtos/Movie'

export interface MetadataAdapterPort {
  parseContent(content: string): MovieFullMetadata
  toNFO(metadata: MovieFullMetadata): string
}
