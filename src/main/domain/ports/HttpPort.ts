export interface HttpPort {
  downloadFile(url: string): Promise<Buffer>
}
