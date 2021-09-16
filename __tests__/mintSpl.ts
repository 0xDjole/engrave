import * as anchor from '@project-serum/anchor'
import { mintCreate } from '../services'

describe('mintSpl', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env())
    it("It's minted!", async () => {
        // Add your test here.
        const provider = anchor.Provider.env()
        const payerAccount = anchor.web3.Keypair.generate()
        const mintAuthorityAccount = anchor.web3.Keypair.generate()

        const mint = await mintCreate({
            provider,
            payerAccount,
            mintAuthorityAccount
        })

        expect(mint).toBeTruthy()
    })
})
