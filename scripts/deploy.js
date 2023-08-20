const hre = require("hardhat");
const fs = require("fs");
const dotenv = require("dotenv");

dotenv.config();

async function main() {
  const lock = await hre.ethers.deployContract("LandscapeNFT");

  await lock.waitForDeployment();

  const targetAddress = lock.target;
  console.log(`Deployed to ${targetAddress}`);

    // export the addresses
    fs.writeFileSync(
        "metadata/contractAddress.js",
        `module.exports = {
            nftAddress: "${targetAddress}"
          };
          `
      );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});