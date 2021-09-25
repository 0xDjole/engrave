import Arweave from 'arweave'
import { FArweaveInit } from '../types'

const arweaveInit: FArweaveInit = params => {
    const arweave = Arweave.init(params)

    return arweave
}

export default arweaveInit
