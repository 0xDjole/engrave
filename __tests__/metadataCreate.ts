import * as anchor from '@project-serum/anchor'
import { mintCreate, metadataCreate, metadataGet, Data } from '../services'

describe('metadataCreate', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env())
    it('Creates metadata successfully', async () => {
        // Add your test here.
        const provider = anchor.Provider.env()
        const payerAccount = anchor.web3.Keypair.generate()
        const mintAuthorityAccount = anchor.web3.Keypair.generate()
        const metadataAccount = anchor.web3.Keypair.generate()
        const program = anchor.workspace.Metadata

        const mint = await mintCreate({
            provider,
            payerAccount,
            mintAuthorityAccount
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

        await program.rpc.metadataCreate(data, true, {
            accounts: {
                metadataAccount: metadataAccount.publicKey,
                mintKey: mint.publicKey,
                authority: mintAuthorityAccount.publicKey,
                rent: anchor.web3.SYSVAR_RENT_PUBKEY,
                systemProgram: anchor.web3.SystemProgram.programId
            },
            signers: [mintAuthorityAccount]
        })

        let metadataGetData = await metadataGet({
            mintKey: mint.publicKey,
            program
        })

        console.log({ metadataGetData })

        expect(metadataAccount).toBeTruthy()
    })
})
