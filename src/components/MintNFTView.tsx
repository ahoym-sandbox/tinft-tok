import { uploadFile } from '../api';
import {
  buildMetadataFromFile,
  convertNFTMetadatToHex,
} from '../utilities/metadataConverter';
import { mintNft } from '../XrplSandbox/scripts/mintNFTWithMetadata';
import { ImageCapture } from './ImageCapture/ImageCapture';

interface MintNFTViewProps {
  redirectToGalleryView: () => void;
}

export const MintNFTView: React.FC<MintNFTViewProps> = (props) => {
  const { redirectToGalleryView } = props;

  const onSubmit = async (file: File) => {
    const url = `https://ahoym-sandbox-tinft-tok.s3.amazonaws.com/${file.name}`;
    const metadata = buildMetadataFromFile(file, url);
    const URI = convertNFTMetadatToHex(metadata);

    const uploadResult = await uploadFile(file, URI);
    console.log('uploadedResult', uploadResult);
    if (uploadResult.ok) {
      mintNft(URI);
      redirectToGalleryView();
    }
  };

  return (
    <div>
      <ImageCapture onSubmit={onSubmit} onChange={() => {}} />
    </div>
  );
};
