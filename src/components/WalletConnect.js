import React from 'react';
import { useBlockchain } from '../context/BlockchainContext';

const WalletConnect = () => {
  const {
    account,
    balance,
    chainId,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet
  } = useBlockchain();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const formatBalance = (balance) => {
    return parseFloat(balance).toFixed(4);
  };

  const getChainName = (chainId) => {
    switch (chainId) {
      case '1':
        return 'Ethereum Mainnet';
      case '137':
        return 'Polygon Mainnet';
      case '80001':
        return 'Polygon Mumbai';
      default:
        return `Chain ${chainId}`;
    }
  };

  if (isConnected) {
    return (
      <div className="gov-card p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-government-dark">
            Wallet Connected
          </h3>
          <button
            onClick={disconnectWallet}
            className="text-sm text-red-600 hover:text-red-700"
          >
            Disconnect
          </button>
        </div>

        <div className="space-y-3">
          <div>
            <label className="text-sm font-medium text-secondary-600">Address</label>
            <p className="font-mono text-sm text-government-dark">
              {formatAddress(account)}
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-600">Balance</label>
            <p className="text-government-dark">
              {formatBalance(balance)} ETH
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-secondary-600">Network</label>
            <p className="text-government-dark">
              {getChainName(chainId)}
            </p>
          </div>
        </div>

        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="gov-card p-4">
      <h3 className="text-lg font-semibold text-government-dark mb-4">
        Connect Wallet
      </h3>
      
      <p className="text-sm text-secondary-600 mb-4">
        Connect your MetaMask wallet to interact with the blockchain and manage carbon credits.
      </p>

      <button
        onClick={connectWallet}
        disabled={isConnecting}
        className={`w-full gov-button gov-button-primary ${
          isConnecting ? 'opacity-50 cursor-not-allowed' : ''
        }`}
      >
        {isConnecting ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
            Connecting...
          </div>
        ) : (
          <div className="flex items-center justify-center">
            <span className="mr-2">🦊</span>
            Connect MetaMask
          </div>
        )}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <p className="text-sm text-red-600">{error}</p>
        </div>
      )}

      <div className="mt-4 text-xs text-secondary-500">
        <p>Supported networks: Polygon Mumbai (Testnet)</p>
        <p>Make sure you have some test MATIC for transactions</p>
      </div>
    </div>
  );
};

export default WalletConnect;
