import { useEffect, useState } from 'react';
import './App.css';
import logo from './logo.svg';
import { xrplClient1, xrplClient2 } from './XrplSandbox';

// Can import and run TS scripts this way if so desired
// import './XrplApiSandbox/scripts/sendXrp';
// import './XrplApiSandbox/scripts/sendEscrow';

// Generate testnet wallets
const generateWalletRequestOne = xrplClient1.generateWallet();
const generateWalletRequestTwo = xrplClient2.generateWallet();

function App() {
  const [logs, setLogs] = useState<unknown[]>([]);

  useEffect(() => {
    generateWalletRequestOne.then((result) => {
      setLogs((logState) => [
        result,
        'Created faucet wallet for Client 1',
        ...logState,
      ]);
    });
  }, []);

  useEffect(() => {
    generateWalletRequestTwo.then((result) => {
      setLogs((logState) => [
        result,
        'Created faucet wallet for Client 2',
        ...logState,
      ]);
    });
  }, []);

  useEffect(() => {
    // After testnet wallet creations, send a 22 XRP payment
    Promise.all([generateWalletRequestOne, generateWalletRequestTwo])
      .then(() => xrplClient1.sendPayment(22, xrplClient2.wallet()!.address!))
      .then((result) => {
        setLogs((logState) => [
          result,
          'Sent transaction from Wallet 1 to Wallet 2',
          ...logState,
        ]);
      });
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />

        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>

        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <a
          className="App-link"
          href="https://testnet.xrpl.org/"
          target="_blank"
          rel="noopener noreferrer"
        >
          XRPL Testnet Explorer
        </a>

        <div className="App-logs">
          {logs.map((log) => {
            if (typeof log === 'string') {
              return (
                <p key={Math.random()} className="App-console-log">
                  {log}
                </p>
              );
            } else if (typeof log === 'object') {
              return (
                <div key={Math.random()}>
                  <pre>{JSON.stringify(log, null, 2)}</pre>
                </div>
              );
            }
            return null;
          })}
        </div>
      </header>
    </div>
  );
}

export default App;
