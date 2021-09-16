import * as anchor from '@project-serum/anchor'
import { TOKEN_PROGRAM_ID, Token } from '@solana/spl-token'

interface MintCreateParams {
    provider: anchor.Provider
    payerAccount: anchor.web3.Keypair
    mintAuthorityAccount: anchor.web3.Keypair
}

type MintCreate = (params: MintCreateParams) => Promise<Token>

const mintCreate: MintCreate = async ({
    provider,
    payerAccount,
    mintAuthorityAccount
}) => {
    await provider.connection.confirmTransaction(
        await provider.connection.requestAirdrop(
            payerAccount.publicKey,
            10000000000
        ),
        'confirmed'
    )
    return await Token.createMint(
        provider.connection,
        payerAccount,
        mintAuthorityAccount.publicKey,
        null,
        0,
        TOKEN_PROGRAM_ID
    )
}

export default mintCreate
