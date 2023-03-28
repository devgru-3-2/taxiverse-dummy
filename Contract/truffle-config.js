const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
module.exports = {
  networks: {
    inf_RideX_goerli: {
      network_id: 5,
      gasPrice: 100000000000,
      provider: new HDWalletProvider(fs.readFileSync('c:\\Users\\Asdmin\\OneDrive\\Desktop\\github\\RideX-neha\\RideX\\Contract\\1.env', 'utf-8'), "https://goerli.infura.io/v3/4fc56343335a4df0a5d756fa1de3d79d")
    }
  },
  mocha: {},
  compilers: {
    solc: {
      version: "0.4.0"
    }
  }
};
