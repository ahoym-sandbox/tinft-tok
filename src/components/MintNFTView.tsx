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
    const fileName = `${file.lastModified}-${file.name}`;
    const uploadResult = await uploadFile(file, fileName);

    console.log('uploadedResult', uploadResult);
    if (uploadResult.ok) {
      const url = `https://ahoym-sandbox-tinft-tok.s3.amazonaws.com/${fileName}`;
      const metadata = buildMetadataFromFile(file, url);
      const URI = convertNFTMetadatToHex(metadata);
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
