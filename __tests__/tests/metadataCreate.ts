import * as anchor from '@project-serum/anchor'
import { mintCreate, metadataCreate, metadataGet, Data } from '../../services'

describe('metadataCreate', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env())
    it('Creates metadata successfully', async () => {
        // Add your test here.
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
    })
})
