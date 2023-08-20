const { ethers } = require("hardhat");
const LandscapeNFTAbi = require("path_to_LandscapeNFT_abi");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const networkAddress = "YOUR_POLYGON_MUMBAI_RPC_URL";
  const provider = new ethers.providers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);
  const contractAddress = require("../metadata/contractAddress").nftAddress;

  const LandscapeNFT = new ethers.Contract(contractAddress, LandscapeNFTAbi, signer);

  const balance = await LandscapeNFT.balanceOf(signer.address);
  console.log("Balance on Mumbai:", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
