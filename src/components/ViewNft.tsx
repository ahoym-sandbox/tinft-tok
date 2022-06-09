import { ImageListItem } from '@mui/material';
import { useEffect, useState } from 'react';
import { getNftMetadata } from '../utilities';
import {
  nftDevNetXrplClient1,
  promiseNftDevNXrplClient1,
} from '../XrplSandbox/createClients';
import { NFT } from '../XrplSandbox/types';

type ViewNftProps = {
  nft: NFT;
};

export const ViewNft = ({ nft }: ViewNftProps) => {
  const nftMetadata = nft.URI ? getNftMetadata(nft.URI) : null;
  const [isOwnNft, setIsOwnNft] = useState<boolean>(false);
  const [buyOffers, setBuyOffers] = useState([]);

  useEffect(() => {
    promiseNftDevNXrplClient1
      .then(() => nftDevNetXrplClient1.listNftBuyOffers(nft.NFTokenID))
      .then((response: any) => {
        console.log(`Buy offers for ${nft.NFTokenID}`, response.result);
        setBuyOffers(response.result?.offers);
      })
      .then(nftDevNetXrplClient1.viewOwnNfts)
      .then((res: any) => {
        console.log(`Own NFTs`, res.result.account_nfts);
        const nftList = res.result.account_nfts || [];
        const isOwnNft = nftList.find(
          (thisNft: NFT) => thisNft.NFTokenID === nft.NFTokenID
        );
        setIsOwnNft(isOwnNft);
        return isOwnNft;
      });
  }, [nft.NFTokenID]);

  console.log('TEST LOG HERE', isOwnNft, buyOffers);

  return (
    <div className="ImageList pb-12">
      {nftMetadata && (
        <>
          <ImageListItem>
            {nftMetadata.fileType === 'video/quicktime' ? (
              <video
                height="150"
                autoPlay
                muted
                loop
                controls
                src={nftMetadata.url}
              />
            ) : (
              <img
                src={nftMetadata.url}
                alt="alt"
                style={{ maxWidth: '400px' }}
                loading="lazy"
              />
            )}
          </ImageListItem>
          <div className="my-3">
            <p className="capture-preview-field">Author</p>
            <p>{nftMetadata.author}</p>
          </div>
        </>
      )}

      <div className="my-3">
        <p className="capture-preview-field">NFTokenID</p>
        <div className="center">
          <p className="squish">{nft.NFTokenID}</p>
        </div>
      </div>

      <div className="my-3">
        <p className="capture-preview-field">Original Issuer</p>
        <p>{nft.Issuer}</p>
      </div>

      {buyOffers && (
        <div className="my-3">
          <p className="capture-preview-field"># of Buy Offers</p>
          <p>{buyOffers.length}</p>
        </div>
      )}
    </div>
  );
};
