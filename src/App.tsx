import { useState } from 'react';
import { AppBottomNavigation } from './components/AppBottomNavigation';
import UserNFTGallery from './components/UserNFTGallery';
import { MintNFTView } from './components/MintNFTView';
import { AppViews } from './types';
import './App.css';
import NFTMarketplace from './components/NFTMarketplace';
import { TopNavigation } from './components/TopNavigation';
import { VerifyNft } from './components/VerifyNft';

function App() {
  const [currentView, setCurrentView] = useState(AppViews.MARKETPLACE);

  let body = null;
  switch (currentView) {
    case AppViews.MARKETPLACE:
      body = <NFTMarketplace />;
      break;
    case AppViews.GALLERY:
      body = <UserNFTGallery />;
      break;
    case AppViews.MINT_IT:
      body = (
        <MintNFTView
          redirectToGalleryView={() => setCurrentView(AppViews.GALLERY)}
        />
      );
      break;
    case AppViews.VERIFY_NFT:
      body = <VerifyNft />;
      break;
    default:
      body = <NFTMarketplace />;
  }

  return (
    <div className="App">
      <TopNavigation onViewChange={() => setCurrentView(AppViews.VERIFY_NFT)} />
      <div className="AppContainer w-full h-full">{body}</div>
      <AppBottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
}

export default App;
