const { ethers } = require("hardhat");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const networkAddress = "https://eth-goerli.g.alchemy.com/v2/h-asDNMJ21mVniDAY3XE1VQ9F7PW7A0x";
  const provider = new ethers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);
  const contractAddress = require("../metadata/contractAddress").nftAddress;

  const LandscapeNFT = await ethers.getContractFactory("LandscapeNFT", signer);
  const contract = await LandscapeNFT.attach(contractAddress);

  await contract.mint(5);

  console.log("Minted 5 tokens");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
