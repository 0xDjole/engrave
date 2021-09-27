import * as anchor from '@project-serum/anchor'
import { MetadataGet } from '../types'

const metadataGet: MetadataGet = async ({ mintKey, program }) => {
    const [metadataKey] = anchor.utils.publicKey.findProgramAddressSync(
        [
            Buffer.from('metadata'),
            program.programId.toBuffer(),
            mintKey.toBuffer()
        ],
        program.programId
    )
    return await program.account.metadata.fetch(metadataKey)
}

export default metadataGet
