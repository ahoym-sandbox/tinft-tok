import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import { convertHexToString, NFTokenMint } from 'xrpl';
import { NFTMetadata } from '../XrplSandbox/types';
import EmptyState from './EmptyState';
import { useEffect, useState } from 'react';
import { DEVNETCLIENTS } from '../XrplSandbox/createClients';
import { TEST_WALLET_SECRET } from '../XrplSandbox/scripts/CONFIG';

const getNftMetadata = (URI: string): NFTMetadata => {
  return JSON.parse(convertHexToString(URI));
};

const NFTMarketplace = () => {
  const [nfts, setNfts] = useState<any>([]);

  useEffect(() => {
    async function getNFTs() {
      const nftlist = await Promise.all(
        DEVNETCLIENTS.map(async (account: any, index: number) => {
          await account.generateWallet(TEST_WALLET_SECRET[index]);
          return account.viewOwnNfts();
        })
      );
      console.log('LIST: ', nftlist);
      let all: any[] = [];
      nftlist.forEach((a: any) => {
        all = [...all, ...a.result.account_nfts];
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
