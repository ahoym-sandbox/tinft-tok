import { useEffect, useState } from 'react';
import './App.css';
import NFTListView from './components/NFTListView';
import EmptyState from './components/EmptyState';
import { logMessageAndPass } from './utilities';
import { nftDevNetXrplClient2 } from './XrplSandbox/createClients';
import { CLIENT_TWO_FAUCET_WALLET_SECRET } from './XrplSandbox/scripts/CONFIG';
import { AccountNFTsResponse, Wallet } from 'xrpl';

function App() {
  const [logs, setLogs] = useState<unknown[]>([]);
  const [NFTList, setNFTList] = useState<AccountNFTsResponse["result"]["account_nfts"] | []>([]);
  const [account, setAccount] = useState<Wallet | null>(null);

  useEffect(() => {

    console.log('🪙 Starting mintTransferableNft script 🪙');

    const mintTransferableNftProcedure = nftDevNetXrplClient2
      .generateWallet(CLIENT_TWO_FAUCET_WALLET_SECRET)
      .then((w) => {
        logMessageAndPass('Created Client1 wallet on NFT-Devnet')
        setAccount(w);
      })
      .then(() => nftDevNetXrplClient2.mintTransferableNft()) // Can pass options to method if desired
      .then(logMessageAndPass('Minted a transferable NFT'))
      .then(nftDevNetXrplClient2.viewOwnNfts)
      .then((nftList) => {
        logMessageAndPass('List NFTs on the Client1 wallet account response')
        setNFTList(nftList.result.account_nfts)
      })
      .finally(() => console.log('🪙 Finished the mintTransferableNft script 🪙'));

  }, []);


  return (
    <div className="App">
      <div className="mt-8">
        <h1 className="text-lg font-semibold">Minted NFTs</h1>
      </div>

      {NFTList.length > 0 ? <NFTListView mintedNFTs={NFTList} /> : <EmptyState />}

    </div >
  );
}

export default App;
