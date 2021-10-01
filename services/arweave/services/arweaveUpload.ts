import { FArweaveUpload } from '../types'
import path from 'path'

const contentType = (fileName: string) => {
    const extension = path.extname(fileName)
    switch (extension) {
        case '.png':
            return 'image/png'
        case '.jpg':
            return 'image/jpg'
        case '.json':
            return 'application/json'
        default:
            return 'text/plain'
    }
}

const arweaveUpload: FArweaveUpload = async (
    { data, fileName },
    { arweave, testWeave }
) => {
    let key = testWeave ? testWeave.rootJWK : await arweave.wallets.generate()

    let transaction = await arweave.createTransaction(
        {
            data
        },
        key
    )

    if (fileName) {
        transaction.addTag('Content-Type', contentType(fileName))
    }

    await arweave.transactions.sign(transaction, key)

    let uploader = await arweave.transactions.getUploader(transaction)

    while (!uploader.isComplete) {
        await uploader.uploadChunk()
        console.log(
            `${uploader.pctComplete}% complete, ${uploader.uploadedChunks}/${uploader.totalChunks}`
        )
    }

    return transaction.id
}

export default arweaveUpload
