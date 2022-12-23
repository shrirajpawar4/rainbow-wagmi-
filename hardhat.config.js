require("@nomiclabs/hardhat-waffle");
require('dotenv').config()
require("@nomiclabs/hardhat-etherscan");  // << What we will use to verify our contract

task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});



module.exports = {
  solidity: {
    compilers: [
      {
        version: "0.8.7",
        settings: {
          optimizer: {
            enabled: true,
            runs: 200,
          },
        },
      }
    ],
  },

  networks: {

    hardhat: {
      chainId: 1337
    },
    mainnet: {
      url: process.env.MAINNET_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
    },
    mumbai: {
      url: process.env.MUMBAI_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      saveDeployments: true,
    }
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY
  }
};
