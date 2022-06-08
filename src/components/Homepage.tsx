import { Container } from "@mui/system";
import { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";

import { MintNFTForm } from "./MintNFTForm";
import { useEffect } from "react";
import { nftDevNetXrplClient1 } from "../XrplSandbox/createClients";
import { CLIENT_ONE_FAUCET_WALLET_SECRET } from "../XrplSandbox/scripts/CONFIG";

export const HomePage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [previewUri, setPreviewUri] = useState("");
  const [mintedNfts, setMintedNfts] = useState([]);

  useEffect(() => {
    nftDevNetXrplClient1
      .generateWallet(CLIENT_ONE_FAUCET_WALLET_SECRET)
      .then(nftDevNetXrplClient1.viewOwnNfts)
      .then((res: any) => {
        console.log(res.result.account_nfts);
        const nftList = res.result.account_nfts;
        if (!!nftList.length) setMintedNfts(nftList);
      });
  }, []);

  const handleTakePhoto = (dataUri: any) => {
    console.log(dataUri);
    setShowCamera(false);
    setPreviewUri(dataUri);
  };

  return (
    <div className="min-h-full">
      <header className="bg-white shadow">
        <div className=""></div>
      </header>
      <main>
        <Container className="flex" style={{ padding: "24px" }}>
          {!showCamera && !previewUri.length && (
            <label htmlFor="contained-button-file">
              <Button
                variant="contained"
                component="span"
                onClick={() => setShowCamera(true)}
                style={{
                  marginTop: "20px",
                }}
              >
                Take NFT Photo
                <span> </span>
                <PhotoCamera style={{ marginLeft: "10px" }} />
              </Button>
            </label>
          )}
          {showCamera && (
            <Camera
              onTakePhoto={(dataUri: any) => {
                handleTakePhoto(dataUri);
              }}
            />
          )}
          {!!previewUri.length && (
            <div>
              <img src={previewUri} alt="" />
              <MintNFTForm uri={previewUri} />
            </div>
          )}
        </Container>
      </main>
    </div>
  );
};
