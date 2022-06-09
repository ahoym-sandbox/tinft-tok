import { Button, CircularProgress, ImageListItem } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { dropsToXrp } from 'xrpl';
import { NFTOffer } from 'xrpl/dist/npm/models/common';
import { getNftMetadata } from '../utilities';
import {
  nftDevNetXrplClient1,
  promiseNftDevNXrplClient1,
} from '../XrplSandbox/createClients';
import { NFT } from '../XrplSandbox/types';

type ViewNftProps = {
  nft: NFT;
  redirectToGalleryView: () => void;
};

export const ViewNft = ({ nft, redirectToGalleryView }: ViewNftProps) => {
  const nftMetadata = nft.URI ? getNftMetadata(nft.URI) : null;
  const [isOwnNft, setIsOwnNft] = useState<boolean>(false);
  const [buyOffers, setBuyOffers] = useState<NFTOffer[]>([]);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [showConfetti, setShowConfetti] = useState<boolean>(false);
  const width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  useEffect(() => {
    promiseNftDevNXrplClient1
      .then(() => nftDevNetXrplClient1.listNftBuyOffers(nft.NFTokenID))
      .then((response: any) => {
        console.log(`Buy offers for ${nft.NFTokenID}`, response.result);
        response.result?.offers && setBuyOffers(response.result?.offers);
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

  const bestBuyOffer =
    buyOffers.length === 0
      ? null
      : buyOffers.reduce((prev: NFTOffer, curr: NFTOffer) =>
          Number(prev.amount) > Number(curr.amount) ? prev : curr
        );

  const handleBuyOffer = useCallback(() => {
    if (bestBuyOffer) {
      setSubmitting(true);
      promiseNftDevNXrplClient1
        .then(() =>
          nftDevNetXrplClient1.acceptNftBuyOffer(bestBuyOffer.nft_offer_index)
        )
        .then(() => {
          setSubmitting(false);
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
            redirectToGalleryView();
          }, 2000);
        });
    }
  }, [bestBuyOffer, redirectToGalleryView]);

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

          <div className="my-3">
            <p className="capture-preview-field">Created At</p>
            <p>{new Date(nftMetadata.lastModified).toISOString()}</p>
          </div>

          <div className="my-3">
            <p className="capture-preview-field">File Type</p>
            <p>{nftMetadata.fileType}</p>
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

      {submitting && (
        <CircularProgress
          size={150}
          sx={{
            color: 'black',
            opacity: '0.75',
          }}
        />
      )}

      {isOwnNft && bestBuyOffer && (
        <div className="my-7">
          <Button
            variant="outlined"
            disabled={submitting}
            onClick={handleBuyOffer}
          >{`Accept best offer @ ${dropsToXrp(
            bestBuyOffer.amount as any
          )} XRP`}</Button>
        </div>
      )}

      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          gravity={0.25}
          initialVelocityX={10}
        />
      )}
    </div>
  );
};
