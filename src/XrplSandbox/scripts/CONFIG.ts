const MUST_BE_REPLACED_VALUE = 'see-@link-for-tesnet-faucet';

/**
 * See @link to get credentials from the NFT-Devnet XRP faucet.
 * > Generate NFT-Devnet credentials > Copy "Secret" > Use as *_FAUCET_WALLET_SECRET
 *
 * {@link https://xrpl.org/xrp-testnet-faucet.html}
 */

// These are DEVNET creds and are hardcoded for the hackathon, don't do this in production.
export const CLIENT_ONE_FAUCET_WALLET_SECRET = 'ssnBPCVhTkK5wGmUrJwnkQknEFZN9';
export const CLIENT_TWO_FAUCET_WALLET_SECRET = 'snu8c8d11Vr7UKvJrcH5LeD6GoNy1';

if (
  CLIENT_ONE_FAUCET_WALLET_SECRET === (MUST_BE_REPLACED_VALUE as string) ||
  CLIENT_TWO_FAUCET_WALLET_SECRET === (MUST_BE_REPLACED_VALUE as string)
) {
  throw new Error(
    `Must instantiate clients with secrets generated from the XRP Faucet Wallet.\n
    Be sure to use the correct test or devnet corresponding to the functionalities you want to use.\n
    https://xrpl.org/xrp-testnet-faucet.html`
  );
}
