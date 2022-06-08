import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import { useEffect, useState } from "react";
import { convertHexToString, NFTokenMint } from "xrpl";
import { nftDevNetXrplClient1 } from "../XrplSandbox/createClients";
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from "../XrplSandbox/scripts/CONFIG";

interface NFTsViewProps {}

const getNftURL = (URI: string): string => {
  const stringValue = convertHexToString(URI);
  const originalMetadata = JSON.parse(stringValue);
  console.log(stringValue);

  return originalMetadata.url;
};

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
            <ImageListItem key={nft.URI}>
            <img
              src={getNftURL(nft.URI)}
              alt="alt"
              style={{ maxWidth: "400px" }}
            />
            </ImageListItem>
          ) : null
        )}
        </ImageList>
      )}
    </div>
  );
};
