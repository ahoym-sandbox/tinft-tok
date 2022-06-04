import { logMessageAndPass } from '../../utilities';
import { nftDevNetXrplClient1, nftDevNetXrplClient2 } from '../createClients';
import { mintNftAndCreateBidProcedure } from './createNftBuyOffer';

console.log('🪙 Starting acceptNftBuyOffer script 🪙');

/**
 * Use case:
 * - Someone (Client1) who mints a NFT wants to sell it on the market
 * - Client2 sees NFT, creates a NFT buy offer
 * - Client1 accepts the NFT buy offer
 * - Client2 receives the NFT
 */

/**
 * Be sure to change FAUCET_WALLET_SECRETs in the scripts/CONFIG.ts
 */
mintNftAndCreateBidProcedure
  .then((response: any) =>
    nftDevNetXrplClient1.acceptNftBuyOffer(
      response.result.offers[0].nft_offer_index
    )
  )
  .then(logMessageAndPass('Client1 accepted NFT Buy Offer'))
  .then(nftDevNetXrplClient1.viewOwnNfts)
  .then(logMessageAndPass('Listing Client1 NFTs'))
  .then(nftDevNetXrplClient2.viewOwnNfts)
  .then(logMessageAndPass('Listing Client2 NFTs'))
  .finally(() => console.log('🪙 Finished the acceptNftBuyOffer script 🪙'));
