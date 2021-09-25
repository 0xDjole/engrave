import Arweave from 'arweave'

export interface IArweaveUploadOptions {
    arweave: Arweave
}

export interface IArweaveUpload {
    data: string
}

export interface ApiConfig {
    host?: string
    protocol?: string
    port?: string | number
    timeout?: number
    logging?: boolean
    logger?: Function
}

export type FArweaveInit = (param: ApiConfig) => void

export type FArweaveUpload = (
    param: IArweaveUpload,
    options: IArweaveUploadOptions
) => Promise<void>
