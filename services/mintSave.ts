import * as anchor from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'

interface MintSaveParamsa {
    mintKey: anchor.web3.PublicKey
    program: anchor.Program
}

type MintCreate = (params: MintSaveParams) => Promise<Token>

const mintSave: MintSave = async ({ mintKey, program }) => {
    const [
        mintMetadataKey,
        nonce
    ] = anchor.utils.publicKey.findProgramAddressSync(
        [mintKey.toBuffer()],
        program.programId
    )

    await program.rpc.mintSave()
}

export default mintSave
