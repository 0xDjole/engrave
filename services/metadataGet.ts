import * as anchor from '@project-serum/anchor'

interface MetadataGetParams {
    mintKey: anchor.web3.PublicKey
    program: anchor.Program
}

type MetadataGet = (params: MetadataGetParams) => Promise<anchor.web3.PublicKey>

const metadataGet: MetadataGet = async ({ mintKey, program }) => {
    const [metadataAccount] = anchor.utils.publicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            program.programId.toBuffer(),
            mintKey.toBuffer()
        ],
        program.programId
    )

    return metadataAccount
}

export default metadataGet
