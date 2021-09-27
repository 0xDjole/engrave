import * as anchor from '@project-serum/anchor'
import { Token } from '@solana/spl-token'

interface Creator {
    address: anchor.web3.PublicKey
    verified: boolean
    share: number
}

export interface Data {
    name: string
    symbol: string
    uri: string
    seller_fee_basis_points: number
    creators: [Creator]
}

interface MetadataCreateParams {
    program: anchor.Program
    data: Data
    isMutable: boolean
    mint: Token
    mintAuthority: anchor.web3.Keypair
}

export type MetadataCreate = (params: MetadataCreateParams) => Promise<void>

export type MetadataFile = {
    uri: string
    type: string
}

export type FileOrString = MetadataFile | string

export interface Attribute {
    trait_type?: string
    display_type?: string
    value: string | number
}

export enum MetadataCategory {
    Audio = 'audio',
    Video = 'video',
    Image = 'image',
    VR = 'vr',
    HTML = 'html'
}

export interface IMetadataExtension {
    name: string
    symbol: string

    creators: Creator[] | null
    description: string
    // preview image absolute URI
    image: string
    animation_url?: string

    attributes?: Attribute[]

    // stores link to item on meta
    external_url: string

    seller_fee_basis_points: number

    properties: {
        files?: FileOrString[]
        category: MetadataCategory
        maxSupply?: number
        creators?: {
            address: string
            shares: number
        }[]
    }
}

interface MetadataGetParams {
    mintKey: anchor.web3.PublicKey
    program: anchor.Program
}

export type MetadataGet = (params: MetadataGetParams) => Promise<Object>

interface MintCreateParams {
    provider: anchor.Provider
    payerAccount: anchor.web3.Keypair
    mintAuthority: anchor.web3.Keypair
}

export type MintCreate = (params: MintCreateParams) => Promise<Token>
