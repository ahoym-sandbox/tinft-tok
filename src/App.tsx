import { useState } from 'react';
import { AppBottomNavigation } from './components/AppBottomNavigation';
import UserNFTGallery from './components/UserNFTGallery';
import { MintNFTView } from './components/MintNFTView';
import { AppViews } from './types';
import './App.css';
import NFTMarketplace from './components/NFTMarketplace';
import { TopNavigation } from './components/TopNavigation';
import { VerifyNft } from './components/VerifyNft';
import { NFTokenMint } from 'xrpl';
import { ViewNft } from './components/ViewNft';

function App() {
  const [currentView, setCurrentView] = useState(AppViews.MARKETPLACE);
  const [selectedNft, setSelectedNft] = useState<NFTokenMint | null>(null);

  let body = null;
  switch (currentView) {
    case AppViews.MARKETPLACE:
      body = (
        <NFTMarketplace
          onViewChange={(nft: NFTokenMint) => {
            setSelectedNft(nft);
            setCurrentView(AppViews.VIEW_NFT);
          }}
        />
      );
      break;
    case AppViews.GALLERY:
      body = (
        <UserNFTGallery
          onViewChange={(nft: NFTokenMint) => {
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
      body = <ViewNft nft={selectedNft!} />;
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
