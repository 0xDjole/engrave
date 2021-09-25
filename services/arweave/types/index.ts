import Arweave from 'arweave'
import TestWeave from 'testweave-sdk'

export interface IArweaveUploadOptions {
    arweave: Arweave
    testWeave?: TestWeave
}

export interface IArweaveUpload {
    data: string
}

export type FArweaveInit = () => Arweave

export type FArweaveUpload = (
    param: IArweaveUpload,
    options: IArweaveUploadOptions
) => Promise<string>
