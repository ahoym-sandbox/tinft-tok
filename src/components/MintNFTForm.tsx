import Button from "@mui/material/Button";
import { convertNFTMetadatToHex } from "../utilities/metadataConverter";
import { mintNft } from "../XrplSandbox/scripts/mintNFTWithMetadata";
import { NFTMetadata } from "../XrplSandbox/types";

const buildNftURI = (dataUri: any) => {
  // TODO: get metadata from dataUri
  const metadata: NFTMetadata = {
    author: "piplup",
    description: "06/07/2022",
    url: "https://thumbs.dreamstime.com/z/ripple-xrp-going-to-moon-vector-illustration-rocket-bitcoin-crypto-market-156342690.jpg",
  };

  return convertNFTMetadatToHex(metadata);
};

interface MintNFTFormProps {
  uri: string;
}

export const MintNFTForm: React.FC<MintNFTFormProps> = (props) => {
  const { uri } = props;

  const handleOnClick = async () => {
    await mintNft(buildNftURI(uri));
    window.location.reload();
  }

  return (
    <div>
      <Button
        variant="contained"
        component="span"
        onClick={handleOnClick}
      >
        Mint NFT
      </Button>
    </div>
  );
};
