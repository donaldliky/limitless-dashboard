import { useMemo, useState, createContext } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import Dashboard from './views/Dashboard';
import Services from './views/Services';
import Disconnected from './views/Disconnected';
import SideBar from './components/SideBar';
import Support from './views/Support';
import Whitelist from './views/Whitelist';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// solana
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
  LedgerWalletAdapter
} from '@solana/wallet-adapter-wallets';

import {
  WalletModalProvider
} from '@solana/wallet-adapter-react-ui';

import { clusterApiUrl } from '@solana/web3.js';

// Default styles that can be overridden by your app

import { WalletProvider, ConnectionProvider } from '@solana/wallet-adapter-react';

import { useAppSelector } from "./redux/hook";
// solana
require('@solana/wallet-adapter-react-ui/styles.css');

function App() {
  // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'
  const network = WalletAdapterNetwork.Devnet;

  const global = useAppSelector((state) => state.global);

  //You can also provide a custom RPC endpoint.
  const endpoint = useMemo(() => clusterApiUrl(network), [network]);

  // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading ---
  // Only the wallets you configure here will be compiled into your application, and olny the dependencies
  // of wallets that your users connect to will be loaded.
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter(),
      new LedgerWalletAdapter(),
    ],
    [network]
  );
  return (
    <ConnectionProvider endpoint={endpoint}>
      <WalletProvider wallets={wallets}>
        <WalletModalProvider>
          <ToastContainer />
          <Router>
            <div style={{ display: 'flex' }}>
              <SideBar />
              <Switch>
                <Route path="/dashboard">
                  {
                    global.discord.username === null ? <Disconnected /> : <Dashboard />
                  }
                </Route>
                <Route path="/services">
                  {
                    global.discord.username === null ? <Disconnected /> : <Services />
                  }
                </Route>
                <Route path="/whitelist">
                  {
                    global.discord.username === null ? <Disconnected /> : <Whitelist />
                  }
                </Route>
                <Route path="/support">
                  {
                    global.discord.username === null ? <Disconnected /> : <Support />
                  }
                </Route>
                <Redirect from="/*" to="/dashboard" />
              </Switch>
            </div>
          </Router>

        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
