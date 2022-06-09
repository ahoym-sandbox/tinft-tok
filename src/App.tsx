import { useState } from 'react';
import './App.css';
import { AppBottomNavigation } from './components/AppBottomNavigation';
import { MintNFTView } from './components/MintNFTView';
import NFTMarketplace from './components/NFTMarketplace';
import { TopNavigation } from './components/TopNavigation';
import UserNFTGallery from './components/UserNFTGallery';
import { VerifyNft } from './components/VerifyNft';
import { ViewNft } from './components/ViewNft';
import { AppViews } from './types';
import { NFT } from './XrplSandbox/types';

function App() {
  const [currentView, setCurrentView] = useState(AppViews.MARKETPLACE);
  const [selectedNft, setSelectedNft] = useState<NFT | null>(null);

  let body = null;
  switch (currentView) {
    case AppViews.MARKETPLACE:
      body = (
        <NFTMarketplace
          onViewChange={(nft: NFT) => {
            setSelectedNft(nft);
            setCurrentView(AppViews.VIEW_NFT);
          }}
        />
      );
      break;
    case AppViews.GALLERY:
      body = (
        <UserNFTGallery
          onViewChange={(nft: NFT) => {
            setSelectedNft(nft);
            setCurrentView(AppViews.VIEW_NFT);
          }}
        />
      );
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
    case AppViews.VIEW_NFT:
      body = (
        <ViewNft
          nft={selectedNft!}
          redirectToGalleryView={() => setCurrentView(AppViews.GALLERY)}
        />
      );
      break;
    default:
      body = <VerifyNft />;
  }

  return (
    <div className="App">
      <TopNavigation
        onViewChange={() => {
          setSelectedNft(null);
          setCurrentView(AppViews.VERIFY_NFT);
        }}
      />
      <div className="AppContainer w-full h-full">{body}</div>
      <AppBottomNavigation
        currentView={currentView}
        onViewChange={setCurrentView}
      />
    </div>
  );
}

export default App;
