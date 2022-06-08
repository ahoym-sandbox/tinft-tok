import { uploadFile } from "../api";
import { buildMetadataFromFile, convertNFTMetadatToHex } from "../utilities/metadataConverter";
import { mintNft } from "../XrplSandbox/scripts/mintNFTWithMetadata";
import { ImageCapture } from "./ImageCapture/ImageCapture"

export const MintNFTView = () => {
    const onSubmit = async (file: File) => {
        const imageType = file.type.split("image/")[1]
        const fileExtension = `.${imageType}`;
        const fileName = file.name.split(".")[0];
        const uploadResult = await uploadFile(file, fileExtension, fileName);
        console.log(uploadResult)
        if (uploadResult.ok) {
            const url = `https://ahoym-sandbox-tinft-tok.s3.amazonaws.com/${file.name}`;
            const metadata = buildMetadataFromFile(file, url);
            const URI = convertNFTMetadatToHex(metadata);
            mintNft(URI);
        }

    }

    return (
        <div>
            <ImageCapture onSubmit={onSubmit} onChange={() => {}} />
        </div>
    )
}