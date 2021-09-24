import Arweave from 'arweave'

export default (): Arweave => {
    const arweave = Arweave.init({
        host: '127.0.0.1',
        port: 1984,
        protocol: 'http'
    })

    return arweave
}
