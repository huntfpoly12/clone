export interface NoticeMessage {
  id: number
  expresstionType: string
  writedAt: number
  sticky: boolean
  content?: string
  createdAt: number
  createdBy: string
  updatedAt: number
  updatedBy: string
  ip: string
  active: boolean
  writerCompactUser: {
    id: number
    name: string
    username: string
    active: boolean
  }
  fileStorages?: Array<{
    id: number
    name: string
    url: string
  }>
}
