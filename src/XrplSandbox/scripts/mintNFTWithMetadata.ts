import {
  nftDevNetXrplClient1,
  promiseNftDevNXrplClient1,
} from '../createClients';

console.log('🪙 Starting mintMFTWithMetadata script 🪙');

export const mintNft = async (URI: string) => {
  await promiseNftDevNXrplClient1;

  const res = await nftDevNetXrplClient1.mintTransferableNft({ URI });
  console.log(res);

  // TODO: either upload image with URI as name here of in the caller of this method

  return res;
};
