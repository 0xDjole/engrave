import * as anchor from '@project-serum/anchor'
import { MetadataCreate } from '../types'
const { PublicKey } = anchor.web3

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
