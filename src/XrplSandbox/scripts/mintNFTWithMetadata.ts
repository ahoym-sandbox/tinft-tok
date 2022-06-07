import { nftDevNetXrplClient1 } from '../createClients';
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from './CONFIG';

console.log('🪙 Starting mintMFTWithMetadata script 🪙');

export const mintNft = async (URI: string) => {
  await nftDevNetXrplClient1.generateWallet(CLIENT_ONE_FAUCET_WALLET_SECRET);

  const res = await nftDevNetXrplClient1.mintTransferableNft({ URI });
  console.log(res);
  const nfts = await nftDevNetXrplClient1.viewOwnNfts();
  console.log(nfts);
  return res;
}
