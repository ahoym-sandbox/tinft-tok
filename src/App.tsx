import { useEffect, useState } from 'react';
import './App.css';
import { EnvironmentSelector } from './components/EnvironmentSelector';
import { convertNFTMetadatToHex } from './utilities/metadataConverter';

// Can import and run TS scripts this way if so desired
import { mintNft } from './XrplSandbox/scripts/mintNFTWithMetadata';
import { NFTMetadata } from './XrplSandbox/types';


function App() {
  const [logs, setLogs] = useState<unknown[]>([]);

  useEffect(() => {
    const metadata: NFTMetadata = {
      "author": "piplup",
      "description": "06/07/2022",
      "url": "some-URL"
    };

    mintNft(convertNFTMetadatToHex(metadata));
  }, [])

  return (
    <div className="App">
      <EnvironmentSelector />

      <header className="App-header">
       
        <p>
          See wallet information through:{' '}
          <code>window.xrplClient1.wallet()</code>
        </p>
        <p>
          Access the xrpl client through:{' '}
          <code>window.xrplClient1.client()</code>
        </p>
      </header>
    </div>
  );
}

export default App;
