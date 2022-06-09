import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { NFTokenMint } from 'xrpl';
import { getNftMetadata } from '../utilities';
import { nftDevNetXrplClient1 } from '../XrplSandbox/createClients';
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from '../XrplSandbox/scripts/CONFIG';
import EmptyState from './EmptyState';

type UserNFTGalleryProps = {
  onViewChange: (nft: NFTokenMint) => void;
};

const UserNFTGallery = ({ onViewChange }: UserNFTGalleryProps) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    nftDevNetXrplClient1
      .generateWallet(CLIENT_ONE_FAUCET_WALLET_SECRET)
      .then(nftDevNetXrplClient1.viewOwnNfts)
      .then((res: any) => {
        console.log(res.result.account_nfts);
        const nftList = res.result.account_nfts.reverse();
        if (!!nftList.length) setNfts(nftList);
      });
  }, []);

  return (
    <div className="UserNFTGallery">
      <div className="p-3">
        {!!nfts.length ? (
          <ImageList className="ImageList" cols={2} rowHeight={250}>
            {nfts.map((nft: NFTokenMint, idx) =>
              nft.URI ? (
                <ImageListItem
                  key={getNftMetadata(nft.URI).url + idx}
                  onClick={() => onViewChange(nft)}
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
                  <ImageListItemBar
                    title={getNftMetadata(nft.URI).author}
                    position="below"
                  />
                </ImageListItem>
              ) : null
            )}
          </ImageList>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default UserNFTGallery;
