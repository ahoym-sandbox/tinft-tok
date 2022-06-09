import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
import { Marketplace } from '../assets/Marketplace';
import { MintNft } from '../assets/MintNft';
import { MyNfts } from '../assets/MyNfts';
import { AppViews } from '../types';

type AppBottomNavigationProps = {
  currentView: AppViews;
  onViewChange: (nav: AppViews) => void;
};

export const AppBottomNavigation = ({
  currentView,
  onViewChange,
}: AppBottomNavigationProps) => {
  return (
    <Box
      className="AppBottomNavigation"
      sx={{
        width: '100%',
        marginTop: '16px',
        paddingTop: '16px',
        borderTop: '1px solid #e5e7eb',
      }}
    >
      <BottomNavigation
        showLabels
        value={currentView}
        onChange={(event, newValue) => {
          onViewChange(newValue);
        }}
      >
        <BottomNavigationAction
          label="Marketplace"
          icon={<Marketplace />}
          value={AppViews.MARKETPLACE}
        />
        <BottomNavigationAction
          label="Mint NFT"
          icon={<MintNft />}
          value={AppViews.MINT_IT}
        />
        <BottomNavigationAction
          label="My NFTs"
          icon={<MyNfts />}
          value={AppViews.GALLERY}
        />
      </BottomNavigation>
    </Box>
  );
};
