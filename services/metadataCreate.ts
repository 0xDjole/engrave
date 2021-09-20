import * as anchor from '@project-serum/anchor'
import { Token } from '@solana/spl-token'

const { PublicKey } = anchor.web3

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

type MetadataCreate = (params: MetadataCreateParams) => Promise<void>

const metadataCreate: MetadataCreate = async ({
    program,
    data,
    isMutable,
    mint,
    mintAuthority
}) => {
    const [metadataKey, bump] = await PublicKey.findProgramAddress(
        [
            Buffer.from('metadata'),
            program.programId.toBuffer(),
            mint.publicKey.toBuffer()
        ],
        program.programId
    )

    await program.rpc.metadataCreate(data, isMutable, bump, {
        accounts: {
            metadata: metadataKey,
            mint: mint.publicKey,
            authority: mintAuthority.publicKey,
            rent: anchor.web3.SYSVAR_RENT_PUBKEY,
            systemProgram: anchor.web3.SystemProgram.programId
        },
        signers: [mintAuthority]
    })
}

export default metadataCreate
