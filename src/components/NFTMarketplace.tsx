import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { useEffect, useState } from 'react';
import { convertHexToString, NFTokenMint } from 'xrpl';
import { APP_ACCOUNTS } from '../app-accounts';
import { nftDevNetXrplClient1 } from '../XrplSandbox/createClients';
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from '../XrplSandbox/scripts/CONFIG';
import { NFTMetadata } from '../XrplSandbox/types';
import EmptyState from './EmptyState';

const getNftMetadata = (URI: string): NFTMetadata => {
  return JSON.parse(convertHexToString(URI));
};

const NFTMarketplace = () => {
  const [nfts, setNfts] = useState<any>([]);

  useEffect(() => {
    async function getNFTs() {
      const nftlist = await Promise.all(
        APP_ACCOUNTS.map((address: string) =>
          nftDevNetXrplClient1
            .generateWallet(CLIENT_ONE_FAUCET_WALLET_SECRET)
            .then(() => nftDevNetXrplClient1.viewNfts(address))
        )
      );
      console.log('LIST: ', nftlist);
      let all: any[] = [];
      nftlist.forEach((a: any) => {
        all = [...all, ...a.result.account_nfts].reverse();
      });
      setNfts(all);
    }

    getNFTs();
  }, []);

  return (
    <div className="px-4">
      {!!nfts.length ? (
        <ImageList className="ImageList" cols={2} gap={4} variant="standard">
          {nfts.map((nft: NFTokenMint, idx: any) =>
            nft.URI ? (
              <ImageListItem
                key={getNftMetadata(nft.URI).url + idx}
                className="m-2"
              >
                {getNftMetadata(nft.URI).fileType === 'video/quicktime' ? (
                  <video
                    height="150"
                    autoPlay
                    muted
                    loop
                    controls
                    src={getNftMetadata(nft.URI).url}
                  />
                ) : (
                  <img
                    src={getNftMetadata(nft.URI).url}
                    alt="alt"
                    style={{ maxWidth: '400px' }}
                    loading="lazy"
                  />
                )}
              </ImageListItem>
            ) : null
          )}
        </ImageList>
      ) : (
        <EmptyState />
      )}
    </div>
  );
};

export default NFTMarketplace;
