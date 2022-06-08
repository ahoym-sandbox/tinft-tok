import { nftDevNetXrplClient1 } from '../createClients';
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from './CONFIG';

console.log('🪙 Starting mintMFTWithMetadata script 🪙');

export const mintNft = async (URI: string) => {
  await nftDevNetXrplClient1.generateWallet(CLIENT_ONE_FAUCET_WALLET_SECRET);

  const res = await nftDevNetXrplClient1.mintTransferableNft({ URI });
  console.log(res);

  // TODO: either upload image with URI as name here of in the caller of this method

  return res;
}
