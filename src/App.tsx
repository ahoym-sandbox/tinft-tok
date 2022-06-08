import { Container } from "@mui/material";
import "./App.css";
import { AppBottomNavigation } from "./components/AppBottomNavigation";
// import { MintNFTView } from "./components/MintNFTView";
// import { NFTMarketplace } from "./components/NFTMarketplace";
import UserNFTGallery from "./components/UserNFTGallery";

function App() {
  return (
    <div className="App">
      <Container sx={{ minHeight: "500px", padding: "32px 16px 16px" }}>
        {/* <NFTMarketplace /> */}
        <UserNFTGallery />
        {/* <MintNFTView /> */}
      </Container>
      <AppBottomNavigation />
    </div>
  );
}

export default App;
