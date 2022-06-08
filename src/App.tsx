import { useState } from 'react';
import { AppBottomNavigation } from "./components/AppBottomNavigation";
import UserNFTGallery from './components/UserNFTGallery';
import { MintNFTView } from "./components/MintNFTView";
import { AppViews } from './types';
import "./App.css";

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
