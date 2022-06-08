import { Container } from "@mui/system";
import { useState } from "react";
import Button from "@mui/material/Button";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Camera from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
import { NFTsView } from "./NFTsView";
import { MintNFTForm } from "./MintNFTForm";

export const HomePage = () => {
  const [showCamera, setShowCamera] = useState(false);
  const [previewUri, setPreviewUri] = useState("");

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
          <NFTsView />

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
