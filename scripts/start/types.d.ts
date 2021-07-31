interface SftpDetails {
  ip: string
  port: number
}

interface Limits {
  memory: number
  swap: number
  disk: number
  io: number
  cpu: number
}

interface FeatureLimits {
  databases: number
  allocations: number
  backups: number
}

interface Attributes2 {
  id: number
  ip: string
  ip_alias?: any
  port: number
  notes: string
  is_default: boolean
}

interface Datum2 {
  object: string
  attributes: Attributes2
}

interface Allocations {
  object: string
  data: Datum2[]
}

interface Relationships {
  allocations: Allocations
}

interface Attributes {
  server_owner: boolean
  identifier: string
  uuid: string
  name: string
  node: string
  sftp_details: SftpDetails
  description: string
  limits: Limits
  feature_limits: FeatureLimits
  is_suspended: boolean
  is_installing: boolean
  relationships: Relationships
}

export interface ApiWebsocketResponse {
  token: string
  socket: string
}

export interface ApiServerResponse {
  object: string
  attributes: Attributes
}
interface Links {}

interface Pagination {
  total: number
  count: number
  per_page: number
  current_page: number
  total_pages: number
  links: Links
}

interface Meta {
  pagination: Pagination
}

export interface ApiListResponse<T> {
  object: string
  data: T[]
  meta: Meta
}

export type ApiDataResponse<T> = {
  data: T
}
