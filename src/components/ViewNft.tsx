import { ImageListItem, ImageListItemBar } from '@mui/material';
import { NFTokenMint } from 'xrpl';
import { getNftMetadata } from '../utilities';

type ViewNftProps = {
  nft: NFTokenMint;
};

export const ViewNft = ({ nft }: ViewNftProps) => {
  const nftMetadata = nft.URI ? getNftMetadata(nft.URI) : null;

  return (
    <div>
      {nftMetadata && (
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
          <ImageListItemBar title={nftMetadata.author} position="below" />
        </ImageListItem>
      )}
    </div>
  );
};
