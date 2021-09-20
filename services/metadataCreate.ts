import * as anchor from '@project-serum/anchor'

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
}

type MetadataCreate = (params: MetadataCreateParams) => Promise<void>

const metadataCreate: MetadataCreate = async ({ program, data, isMutable }) => {
    await program.rpc.metadataCreate(data, isMutable)
}

export default metadataCreate
