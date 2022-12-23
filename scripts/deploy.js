const hre = require('hardhat');

async function main() {
  const name = "shree";
  const symbol = "SHREE";

  const Token = await hre.ethers.getContractFactory('MyToken');
  const token = await Token.deploy(name, symbol);

  await token.deployed();

  console.log("Token deployed to: ", token.address);
  const reciept = await token.deployTransaction.wait();
  console.log('gas used: ', reciept.gasUsed);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });