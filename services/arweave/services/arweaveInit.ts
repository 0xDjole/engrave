import Arweave from 'arweave'
import { FArweaveInit } from '../types'

const arweaveInit: FArweaveInit = () => {
    const arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http',
        timeout: 200000,
        logging: true
    })

    return arweave
}

export default arweaveInit
