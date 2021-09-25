import { FArweaveUpload } from '../types'

const arweaveUpload: FArweaveUpload = async (
    { data },
    { arweave, testWeave }
) => {
    let key = testWeave ? testWeave.rootJWK : await arweave.wallets.generate()

    let transaction = await arweave.createTransaction(
        {
            data: Buffer.from(data, 'utf8')
        },
        key
    )

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
