require('dotenv').config();
const HDWalletProvider = require('@truffle/hdwallet-provider');

const privateKeys = [
  "..."
];

const SEPOLIA_RPC_URL = `...`;
const mnemonic = "...";

module.exports = {
  compilers: {
    solc: {
      version: "0.4.0",
    }
  },
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*"
    },
    sepolia: {
      provider: () => new HDWalletProvider(privateKeys, SEPOLIA_RPC_URL),
      network_id: 11155111, // Sepolia's id
      confirmations: 1, // # of confirmations to wait between deployments. (default: 0)
      timeoutBlocks: 200, // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true, // Skip dry run before migrations? (default: false for public nets )
    },
  }
};
