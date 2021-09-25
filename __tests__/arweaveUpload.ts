import { arweaveInit, arweaveUpload } from '../services'
import TestWeave from 'testweave-sdk'

describe('arweaveUpload', () => {
    // Configure the client to use the local cluster.
    it('Upload to arweave', async () => {
        // Add your test here.
        const arweave = arweaveInit()
        const testWeave = await TestWeave.init(arweave)

        const dataTransactionId = await arweaveUpload(
            {
                data: 'Hello world'
            },
            { arweave, testWeave }
        )

        await testWeave.mine()
        const statusAfterMine = await arweave.transactions.getStatus(
            dataTransactionId
        )
        console.log(statusAfterMine) // this will return 200
    })
})
