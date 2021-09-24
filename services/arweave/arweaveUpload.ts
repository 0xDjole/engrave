import Arweave from 'arweave'

export default async (
    data: string,
    {
        arweave
    }: {
        arweave: Arweave
    }
) => {
    let key = await arweave.wallets.generate()

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
}
