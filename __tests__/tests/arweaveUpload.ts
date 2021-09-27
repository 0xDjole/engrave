import { arweaveInit, arweaveUpload } from '../../services'
import TestWeave from 'testweave-sdk'
import { randomData } from '../utils'

describe('arweaveUpload', () => {
    it('Upload to arweave', async () => {
        const data = randomData()

        const arweave = arweaveInit()
        const testWeave = await TestWeave.init(arweave)

        const dataTransactionId = await arweaveUpload(
            {
                data
            },
            { arweave, testWeave }
        )

        await testWeave.mine()
        const statusAfterMine = await arweave.transactions.getStatus(
            dataTransactionId
        )

        const arweaveDataGet = await arweave.transactions.getData(
            dataTransactionId,
            {
                decode: true,
                string: true
            }
        )

        expect(data.toString()).toEqual(arweaveDataGet)
        expect(statusAfterMine.status).toEqual(200)
    })
})
