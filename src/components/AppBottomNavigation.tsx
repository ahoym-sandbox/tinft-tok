import * as React from "react";
import Box from "@mui/material/Box";
import BottomNavigation from "@mui/material/BottomNavigation";
import BottomNavigationAction from "@mui/material/BottomNavigationAction";
import StorefrontIcon from '@mui/icons-material/Storefront';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

export const AppBottomNavigation = () => {
  const [value, setValue] = React.useState(0);

  return (
    <Box sx={{ width: "100%", marginTop: "16px" }}>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
      >
        <BottomNavigationAction label="Marketplace" icon={<StorefrontIcon />} />
        <BottomNavigationAction label="Mint NFTs" icon={<CameraAltIcon />} />
        <BottomNavigationAction label="My NFTs" icon={<AccountCircleIcon />} />
      </BottomNavigation>
    </Box>
  );
};
