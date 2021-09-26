import * as anchor from '@project-serum/anchor'
import TestWeave from 'testweave-sdk'
import {
    arweaveUpload,
    arweaveInit,
    mintCreate,
    metadataCreate,
    metadataGet,
    Data
} from '../../services'
import { promises as fs } from 'fs'
import path from 'path'
import axios from 'axios'

function sleep(ms: number) {
    return new Promise(resolve => {
        setTimeout(resolve, ms)
    })
}

describe('metadataCreateFull', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env())
    it('Creates metadata with arweave image successfully', async () => {
        // Add your test here.
        try {
            const image = await fs.readFile(
                path.join(__dirname, '../utils/test.png')
            )
            console.log(image)

            await fs.writeFile(
                path.join(__dirname, '../utils/test-copy.png'),
                image
            )

            const arweave = arweaveInit()
            const testWeave = await TestWeave.init(arweave)

            const dataTransactionId = await arweaveUpload(
                {
                    data: image
                },
                { arweave, testWeave }
            )

            console.log('dataTransactionId', dataTransactionId)
            await testWeave.mine()

            await sleep(10000)

            const status = await arweave.transactions.getStatus(
                dataTransactionId
            )
            console.log(status)

            const arweaveDataGet = await arweave.transactions.getData(
                dataTransactionId
            )

            console.log('ARAWEAVE', arweaveDataGet)

            const provider = anchor.Provider.env()
            const payerAccount = anchor.web3.Keypair.generate()
            const mintAuthority = anchor.web3.Keypair.generate()
            const metadataAccount = anchor.web3.Keypair.generate()
            const program = anchor.workspace.TokenMetadata

            await provider.connection.confirmTransaction(
                await provider.connection.requestAirdrop(
                    mintAuthority.publicKey,
                    10000000000
                ),
                'confirmed'
            )

            const mint = await mintCreate({
                provider,
                payerAccount,
                mintAuthority
            })

            const data: Data = {
                name: 'fake',
                symbol: 'fake',
                uri: 'fake',
                seller_fee_basis_points: 0,
                creators: [
                    {
                        address: payerAccount.publicKey,
                        verified: true,
                        share: 100
                    }
                ]
            }

            await metadataCreate({
                data,
                isMutable: true,
                mint,
                mintAuthority,
                program
            })

            let metadataGetData = await metadataGet({
                mintKey: mint.publicKey,
                program
            })

            console.log({ metadataGetData })

            expect(metadataAccount).toBeTruthy()
        } catch (error) {
            console.log(error)
        }
    })
})
