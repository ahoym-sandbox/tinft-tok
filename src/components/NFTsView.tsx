import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { useEffect, useState } from "react";
import { convertHexToString, NFTokenMint } from "xrpl";
import { nftDevNetXrplClient1 } from "../XrplSandbox/createClients";
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from "../XrplSandbox/scripts/CONFIG";
import { NFTMetadata } from "../XrplSandbox/types";

interface NFTsViewProps {}

const getNftMetadata = (URI: string): NFTMetadata => {
    return JSON.parse(convertHexToString(URI));
}

export const NFTsView: React.FC<NFTsViewProps> = (props) => {
  const [nfts, setNfts] = useState([]);

  useEffect(() => {
    nftDevNetXrplClient1
      .generateWallet(CLIENT_ONE_FAUCET_WALLET_SECRET)
      .then(nftDevNetXrplClient1.viewOwnNfts)
      .then((res: any) => {
        console.log(res.result.account_nfts);
        const nftList = res.result.account_nfts;
        if (!!nftList.length) setNfts(nftList);
      });
  }, []);

  return (
    <div className="flex justify-items justify-items" style={{ maxWidth: "1200px", margin: "auto" }}>
      {nfts.length === 0 ? (
        <div>
          <p>No NFTs found</p>
          <p>Click here to mint your first NFT!</p>
        </div>
      ) : (
        <ImageList sx={{ width: 800, height: 450 }}
        variant="quilted"
        cols={4}
        rowHeight={121}
        >
        {nfts.map((nft: NFTokenMint) =>
          nft.URI ? (
            <ImageListItem key={getNftMetadata(nft.URI).url}>
            <img
              src={getNftMetadata(nft.URI).url}
              alt="alt"
              style={{ maxWidth: "400px" }}
            />
            <ImageListItemBar
            title={getNftMetadata(nft.URI).author}
            subtitle={<span>{getNftMetadata(nft.URI).description}</span>}
            position="below"
          />
            </ImageListItem>
          ) : null
        )}
        </ImageList>
      )}
    </div>
  );
};
