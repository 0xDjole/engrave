use anchor_lang::{prelude::*, AnchorDeserialize, AnchorSerialize};

#[program]
pub mod init {
    use super::*;

    pub fn create_metadata_account(ctx: Context<CreateMetadataAccount>) -> ProgramResult {
        let metadata_account = &mut ctx.accounts.metadata_account;
    }
}

#[derive(Accounts)]
pub struct CreateMetadataAccount<'info> {
    #[account(
        init,
        seeds = [String::from("metadata").as_bytes(), ctx.program_id.as_bytes()],
        bump = bump,
        payer = authority,
        space = 320,
    )]
    metadata_account: ProgramAccount<'info, Metadata>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    rent: Sysvar<'info, Rent>,
    system_program: AccountInfo<'info>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum MetadataKey {
    Uninitialized,
    EditionV1,
    MasterEditionV1,
    ReservationListV1,
    MetadataV1,
    ReservationListV2,
    MasterEditionV2,
    EditionMarker,
}

#[account]
pub struct Data {
    /// The name of the asset
    pub name: String,
    /// The symbol for the asset
    pub symbol: String,
    /// URI pointing to JSON representing the asset
    pub uri: String,
    /// Royalty basis points that goes to creators in secondary sales (0-10000)
    pub seller_fee_basis_points: u16,
    /// Array of creators, optional
    pub creators: Option<Vec<Creator>>,
}

#[account]
pub struct Metadata {
    pub key: MetadataKey,
    pub update_authority: Pubkey,
    pub mint: Pubkey,
    pub data: Data,
    // Immutable, once flipped, all sales of this metadata are considered secondary.
    pub primary_sale_happened: bool,
    // Whether or not the data struct is mutable, default is not
    pub is_mutable: bool,
    /// nonce for easy calculation of editions, if present
    pub edition_nonce: Option<u8>,
}

#[account]
pub struct Creator {
    pub address: Pubkey,
    pub verified: bool,
    // In percentages, NOT basis points ;) Watch out!
    pub share: u8,
}
