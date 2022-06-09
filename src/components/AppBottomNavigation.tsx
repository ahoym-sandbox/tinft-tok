import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import StorefrontIcon from '@mui/icons-material/Storefront';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Box from '@mui/material/Box';
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
          icon={<StorefrontIcon />}
          value={AppViews.MARKETPLACE}
        />
        <BottomNavigationAction
          label="Mint NFT"
          icon={<CameraAltIcon />}
          value={AppViews.MINT_IT}
        />
        <BottomNavigationAction
          label="My NFTs"
          icon={<AccountCircleIcon />}
          value={AppViews.GALLERY}
        />
      </BottomNavigation>
    </Box>
  );
};
