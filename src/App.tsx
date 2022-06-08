import { useState } from 'react';
import { AppBottomNavigation } from './components/AppBottomNavigation';
import UserNFTGallery from './components/UserNFTGallery';
import NFTMarketplace from "./components/NFTMarketplace";
import { MintNFTView } from "./components/MintNFTView";
import { AppViews } from './types';
import './App.css';

const HOME_VIEW = AppViews.MARKETPLACE;
const GALLERY_VIEW = AppViews.GALLERY;

function App() {
  const [currentView, setCurrentView] = useState(HOME_VIEW);

  let body = null;
  switch (currentView) {
    case AppViews.MARKETPLACE:
      body = <NFTMarketplace />;
      break;
    case AppViews.GALLERY:
      body = <UserNFTGallery />;
      break;
    case AppViews.MINT_IT:
      body = <MintNFTView redirectToGalleryView={() => setCurrentView(GALLERY_VIEW)} />;
      break;
    default:
      body = 'NFT Marketplace';
  }

  return (
    <div className="App">
      <div className="AppContainer">
        {body}
      </div>
      <AppBottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
}

export default App;
