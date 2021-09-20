import * as anchor from '@project-serum/anchor'
import { mintCreate } from '../services'

describe('mintCreate', () => {
    // Configure the client to use the local cluster.
    anchor.setProvider(anchor.Provider.env())
    it("It's minted!", async () => {
        // Add your test here.
        const provider = anchor.Provider.env()
        const payerAccount = anchor.web3.Keypair.generate()
        const mintAuthority = anchor.web3.Keypair.generate()

        const mint = await mintCreate({
            provider,
            payerAccount,
            mintAuthority
        })

        expect(mint).toBeTruthy()
    })
})
