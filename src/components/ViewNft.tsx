import { ImageListItem } from '@mui/material';
import { getNftMetadata } from '../utilities';
import { NFT } from '../XrplSandbox/types';

type ViewNftProps = {
  nft: NFT;
};

export const ViewNft = ({ nft }: ViewNftProps) => {
  const nftMetadata = nft.URI ? getNftMetadata(nft.URI) : null;

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
    </div>
  );
};
