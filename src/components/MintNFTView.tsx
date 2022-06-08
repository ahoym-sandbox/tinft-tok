import * as React from 'react';
import { uploadFile } from '../api';
import {
  buildMetadataFromFile,
  convertNFTMetadatToHex,
} from '../utilities/metadataConverter';
import { mintNft } from '../XrplSandbox/scripts/mintNFTWithMetadata';
import { ImageCapture } from './ImageCapture/ImageCapture';
import { v4 as uuidv4 } from 'uuid';
import Confetti from 'react-confetti';

interface MintNFTViewProps {
  redirectToGalleryView: () => void;
}

export const MintNFTView: React.FC<MintNFTViewProps> = (props) => {
  const { redirectToGalleryView } = props;
  const [showConfetti, setShowConfetti] = React.useState<boolean>(false);
  const width = Math.max(
    document.documentElement.clientWidth || 0,
    window.innerWidth || 0
  );
  const height = Math.max(
    document.documentElement.clientHeight || 0,
    window.innerHeight || 0
  );

  const onSubmit = async (file: File) => {
    const extension = file.name.split('.')[1];
    const fileName = `${uuidv4()}.${extension}`;
    setShowConfetti(true); // What could go wrong? :)
    const uploadResult = await uploadFile(file, fileName);
    console.log('uploadedResult', uploadResult);
    if (uploadResult.ok) {
      const url = `https://ahoym-sandbox-tinft-tok.s3.amazonaws.com/${fileName}`;
      const metadata = buildMetadataFromFile(file, url);
      const URI = convertNFTMetadatToHex(metadata);
      await mintNft(URI);
      setShowConfetti(false);
      setTimeout(() => {
        redirectToGalleryView();
      }, 100);
    }
  };;

  return (
    <div>
      {showConfetti && (
        <Confetti
          width={width}
          height={height}
          gravity={0.25}
          initialVelocityX={10}
        />
      )}
      <ImageCapture onSubmit={onSubmit} onChange={() => {}} />
    </div>
  );
};
