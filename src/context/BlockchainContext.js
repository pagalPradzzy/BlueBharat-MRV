import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { ethers } from 'ethers';

const BlockchainContext = createContext();

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within a BlockchainProvider');
  }
  return context;
};

export const BlockchainProvider = ({ children }) => {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState('0');
  const [chainId, setChainId] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState(null);

  // Mock contract ABI for demonstration
  const contractABI = [
    {
      "inputs": [
        {"internalType": "string", "name": "projectId", "type": "string"},
        {"internalType": "uint256", "name": "hectares", "type": "uint256"},
        {"internalType": "uint256", "name": "carbonCredits", "type": "uint256"},
        {"internalType": "string", "name": "location", "type": "string"}
      ],
      "name": "submitProject",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "string", "name": "projectId", "type": "string"},
        {"internalType": "bool", "name": "approved", "type": "bool"}
      ],
      "name": "verifyProject",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {"internalType": "string", "name": "projectId", "type": "string"},
        {"internalType": "uint256", "name": "amount", "type": "uint256"}
      ],
      "name": "mintCredits",
      "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

  const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS || '0x1234567890123456789012345678901234567890';

  const connectWallet = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setError('MetaMask is not installed. Please install MetaMask to continue.');
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      if (accounts.length === 0) {
        throw new Error('No accounts found');
      }

      // Create provider and signer
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const account = accounts[0];
      const balance = await provider.getBalance(account);
      const network = await provider.getNetwork();

      setProvider(provider);
      setSigner(signer);
      setAccount(account);
      setBalance(ethers.formatEther(balance));
      setChainId(network.chainId.toString());
      setIsConnected(true);

      // Listen for account changes
      window.ethereum.on('accountsChanged', handleAccountsChanged);
      window.ethereum.on('chainChanged', handleChainChanged);

    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error.message);
    } finally {
      setIsConnecting(false);
    }
  }, []);

  const disconnectWallet = () => {
    setProvider(null);
    setSigner(null);
    setAccount(null);
    setBalance('0');
    setChainId(null);
    setIsConnected(false);
    setError(null);
  };

  const handleAccountsChanged = (accounts) => {
    if (accounts.length === 0) {
      disconnectWallet();
    } else {
      setAccount(accounts[0]);
    }
  };

  const handleChainChanged = (chainId) => {
    setChainId(chainId);
    // Optionally reload the page or show a message
  };

  const checkConnection = useCallback(async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
        if (accounts.length > 0) {
          await connectWallet();
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  }, [connectWallet]);

  useEffect(() => {
    checkConnection();
  }, [checkConnection]);

  const submitProject = async (projectData) => {
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.submitProject(
        projectData.id,
        projectData.hectares,
        projectData.carbonCredits,
        projectData.location
      );
      
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error submitting project:', error);
      throw error;
    }
  };

  const verifyProject = async (projectId, approved) => {
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.verifyProject(projectId, approved);
      
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error verifying project:', error);
      throw error;
    }
  };

  const mintCredits = async (projectId, amount) => {
    if (!signer) {
      throw new Error('Wallet not connected');
    }

    try {
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      const tx = await contract.mintCredits(projectId, amount);
      
      await tx.wait();
      return tx.hash;
    } catch (error) {
      console.error('Error minting credits:', error);
      throw error;
    }
  };

  const value = {
    provider,
    signer,
    account,
    balance,
    chainId,
    isConnected,
    isConnecting,
    error,
    connectWallet,
    disconnectWallet,
    submitProject,
    verifyProject,
    mintCredits,
    contractAddress
  };

  return (
    <BlockchainContext.Provider value={value}>
      {children}
    </BlockchainContext.Provider>
  );
};
