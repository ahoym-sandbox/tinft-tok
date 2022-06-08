
import { Container } from "@mui/material";
import "./App.css";
import { AppBottomNavigation } from "./components/AppBottomNavigation";
import { useState } from 'react';
import UserNFTGallery from './components/UserNFTGallery';
import { AppViews } from './types';
import { MintNFTView } from "./components/MintNFTView";

const HOME_VIEW = AppViews.MARKETPLACE;

function App() {
  const [currentView, setCurrentView] = useState(HOME_VIEW);

  let body = null;
  switch (currentView) {
    case AppViews.MARKETPLACE:
      body = 'NFT Marketplace';
      break;
    case AppViews.GALLERY:
      body = <UserNFTGallery />;
      break;
    case AppViews.MINT_IT:
      body = <MintNFTView />;
      break;
    default:
      body = 'NFT Marketplace';
  }

  console.log('TEST LOG HERE', body);

  return (
    <div className="App">
      <Container sx={{ minHeight: '500px', padding: '32px 16px 16px' }}>
        {body}
      </Container>
      <AppBottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
}

export default App;
