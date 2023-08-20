const { ethers } = require("hardhat");
const { FXRootContractAbi } = require("../artifacts/FXRootContractAbi");
const LandscapeNFTAbi = require("../artifacts/contracts/LandscapeNFT.sol/LandscapeNFT.json");
require("dotenv").config();

async function main() {
  const privateKey = process.env.PRIVATE_KEY;
  const networkAddress = "https://eth-goerli.g.alchemy.com/v2/h-asDNMJ21mVniDAY3XE1VQ9F7PW7A0x";
  const provider = new ethers.JsonRpcProvider(networkAddress);
  const signer = new ethers.Wallet(privateKey, provider);
  const contractAddress = require("../metadata/contractAddress").nftAddress;

  const LandscapeNFT = new ethers.Contract(contractAddress, LandscapeNFTAbi, signer);

  const fxRootAddress = "0xF9bc4a80464E48369303196645e876c8C7D972de";
  const fxRoot = new ethers.Contract(fxRootAddress, FXRootContractAbi, signer);

  const tokenIds = [0, 1, 2, 3, 4];

  const approveTx = await LandscapeNFT.connect(signer).setApprovalForAll(fxRootAddress, true);
  await approveTx.wait();
  console.log("Approval confirmed");

  for (const tokenId of tokenIds) {
    const depositTx = await fxRoot.connect(signer).deposit(LandscapeNFT.address, signer.address, tokenId, "0x6566");
    await depositTx.wait();
    console.log(`Deposited tokenId ${tokenId}`);
  }

  console.log("Approved and deposited");

  const balance = await LandscapeNFT.balanceOf(signer.address);
  console.log("Balance on Mumbai:", balance.toString());
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
