import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from 'react';
import { getNftMetadata } from '../utilities';
import {
  nftDevNetXrplClient1,
  promiseNftDevNXrplClient1,
} from '../XrplSandbox/createClients';
import { NFT } from '../XrplSandbox/types';
import EmptyState from './EmptyState';

type UserNFTGalleryProps = {
  onViewChange: (nft: NFT) => void;
};

const UserNFTGallery = ({ onViewChange }: UserNFTGalleryProps) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    promiseNftDevNXrplClient1
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
            {nfts.map((nft: NFT, idx) =>
              nft.URI ? (
                <ImageListItem
                  key={nft.NFTokenID}
                  data-id={nft.NFTokenID}
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
