import Arweave from 'arweave'
import { FArweaveInit } from '../types'

const arweaveInit: FArweaveInit = () => {
    const arweave = Arweave.init({
        host: 'localhost',
        port: 1984,
        protocol: 'http',
        timeout: 20000,
        logging: false
    })

    return arweave
}

export default arweaveInit
