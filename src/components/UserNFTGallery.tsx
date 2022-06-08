import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { convertHexToString, NFTokenMint } from "xrpl";
import { NFTMetadata } from "../XrplSandbox/types";
import EmptyState from "./EmptyState";
import { useEffect, useState } from "react";
import { nftDevNetXrplClient1 } from "../XrplSandbox/createClients";
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from "../XrplSandbox/scripts/CONFIG";


const getNftMetadata = (URI: string): NFTMetadata => {
  return JSON.parse(convertHexToString(URI));
};

const UserNFTGallery = () => {
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
    <div className="UserNFTGallery mt-10 flex flex-col mx-10">
      <div className="w-full inline-block p-3 align-middle rounded-md shadow-md">
        {!!nfts.length ? (
          <ImageList
            sx={{ height: 650 }}
            variant="quilted"
            cols={3}
            rowHeight={200}
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
                    subtitle={
                      <span>{getNftMetadata(nft.URI).description}</span>
                    }
                    position="below"
                  />
                </ImageListItem>
              ) : null
            )}
          </ImageList>
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
};

export default UserNFTGallery;
