import { buildMetadataFromFile, convertNFTMetadatToHex } from "../utilities/metadataConverter";
import { mintNft } from "../XrplSandbox/scripts/mintNFTWithMetadata";
import { ImageCapture } from "./ImageCapture/ImageCapture"

export const MintNFTView = () => {
    const onSubmit = (file: File) => {
        const metadata = buildMetadataFromFile(file);
        const URI = convertNFTMetadatToHex(metadata);
        mintNft(URI);
    }

    return (
        <div>
            <ImageCapture onSubmit={onSubmit} onChange={() => {}} />
        </div>
    )
}