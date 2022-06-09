import { Button, TextField } from '@mui/material';
import { useCallback, useState } from 'react';
import { ALL_ACCOUNTS } from '../app-accounts';
import { MintNft } from '../assets/MintNft';
import { NotVerified } from './assets/NotVerified';

export const VerifyNft = () => {
  const [addressToCheck, setAddressToCheck] = useState<string>('');
  const [isValid, setIsValid] = useState<null | boolean>(null);

  const verifyAddress = useCallback(() => {
    // In a production app, the app would have a DB that knows about all accounts/addresses that have signed up.
    const isAppAddress = ALL_ACCOUNTS.indexOf(addressToCheck) !== -1;
    setIsValid(isAppAddress);
  }, [addressToCheck]);

  return (
    <div className="VerifyNft">
      <div>
        <p className="py-3">
          We can verify whether an address as been registered at Ti(N)FT-Tok.
          NFTs have Issuer fields which denote the address which the NFT was
          minted from.
        </p>

        <p className="py-3">
          As NFTs are minted on content creation in Ti(N)FT-Tok, we have high
          confidence that they are originals.
        </p>
      </div>

      <div className="py-5">
        <TextField
          placeholder="Verify address"
          value={addressToCheck}
          onChange={(event) => {
            setAddressToCheck(event.target.value);
          }}
        />
      </div>

      <div className="py-3">
        <span className="px-3">
          <Button onClick={verifyAddress}>Verify Address</Button>
        </span>
        <span className="px-3">
          <Button
            onClick={() => {
              setIsValid(null);
              setAddressToCheck('');
            }}
          >
            Clear
          </Button>
        </span>
      </div>

      <div className="py-5">
        {!!addressToCheck && isValid === false && (
          <div>
            <p>
              This address is not registered at Ti(N)FT-Tok. Any NFTs issued
              from it are not approved.
            </p>
            <div className="center">
              <NotVerified />
            </div>
          </div>
        )}
        {!!addressToCheck && isValid === true && (
          <div>
            <p>
              This address is registered at Ti(N)FT-Tok. Any NFTs issued from it
              are approved!
            </p>
            <div className="center">
              <MintNft />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
