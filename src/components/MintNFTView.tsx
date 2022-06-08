import { uploadFile } from '../api';
import {
  buildMetadataFromFile,
  convertNFTMetadatToHex,
} from '../utilities/metadataConverter';
import { mintNft } from '../XrplSandbox/scripts/mintNFTWithMetadata';
import { ImageCapture } from './ImageCapture/ImageCapture';
import { v4 as uuidv4 } from 'uuid';

interface MintNFTViewProps {
  redirectToGalleryView: () => void;
}

export const MintNFTView: React.FC<MintNFTViewProps> = (props) => {
  const { redirectToGalleryView } = props;

  const onSubmit = async (file: File) => {
    const extension = file.name.split('.')[1];
    const fileName = `${uuidv4()}.${extension}`;
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
