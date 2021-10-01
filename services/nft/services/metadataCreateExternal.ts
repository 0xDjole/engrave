import * as anchor from '@project-serum/anchor'
import { IMetadataExtension } from '../types'
const { PublicKey } = anchor.web3

const metadataCreateExternal: MetadataCreate = async ({
    program,
    data,
    isMutable,
    mint,
    mintAuthority
}) => {}

export default metadataCreateExternal
