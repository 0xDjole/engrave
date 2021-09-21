use anchor_lang::{prelude::*, AnchorDeserialize, AnchorSerialize};

declare_id!("Fg6PaFpoGXkYsidMpWTK6W2BeZ7FEfcYkg476zPFsLnS");

#[program]
pub mod metadata {
    use super::*;

    pub fn metadata_create(
        ctx: Context<MetadataCreate>,
        data: Data,
        is_mutable: bool,
        bump: u8,
    ) -> ProgramResult {
        let metadata_account = &mut ctx.accounts.metadata;
        metadata_account.key = MetadataKey::MasterEdition;
        metadata_account.update_authority = *ctx.accounts.authority.to_account_info().key;
        metadata_account.mint = *ctx.accounts.mint.to_account_info().key;
        metadata_account.data = data;
        metadata_account.primary_sale_happened = false;
        metadata_account.is_mutable = is_mutable;
        Ok(())
    }
}

#[derive(Accounts)]
#[instruction(data: Data, is_mutable: bool, bump: u8)]
pub struct MetadataCreate<'info> {
    #[account(
        init,
        seeds = [String::from("metadata").as_bytes(), &program_id.to_bytes(), mint.key.as_ref()],
        bump = bump,
        payer = authority,
        space = 320,
    )]
    metadata: ProgramAccount<'info, Metadata>,
    mint: AccountInfo<'info>,
    #[account(mut, signer)]
    authority: AccountInfo<'info>,
    rent: Sysvar<'info, Rent>,
    system_program: AccountInfo<'info>,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub enum MetadataKey {
    MasterEdition,
}

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
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

#[derive(AnchorSerialize, AnchorDeserialize, Clone)]
pub struct Creator {
    pub address: Pubkey,
    pub verified: bool,
    // In percentages, NOT basis points ;) Watch out!
    pub share: u8,
}
