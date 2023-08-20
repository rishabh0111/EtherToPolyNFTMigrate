# ERC721 Goerli to Mumbai Bridge Using fxPortal
This project demonstrates how to use the fxPortal contracts to transfer ERC721 nft tokens from Goerli to Mumbai. In this project I have created 5 NFTs using `DALL-E`

### Steps for Bridging

1. Install dependencies
    ```
    npm i
    ```
2. Put your private key in the .env.examples file and rename to .env when finished
3. Run below command to deploy ERC721 contract
    ~~~
    npx hardhat run scripts/deploy.js --network goerli
    ~~~
4. Paste the newly deployed contract address in the `nftAddress` variable for the other scripts
5. Make sure to fill in your public key (address of Metamask Wallet)
6. Run  to mint tokens to your wallet
    ```
    npx hardhat run scripts/BatchMint.js --network goerli
    ```
7. Run  to approve and deposit your tokens to polygon
    ```
    npx hardhat run scripts/BatchTransfer.js --network goerli
    ```
8. Wait 20-30ish minutes for tokens to show on polygon account
9. Use https://mumbai.polygonscan.com/ to check your account for the nfts. Once they arrive, you can click on the transaction to get the contract address for polygon.
10. Use this polygon contract address for your getBalance script's tokenAddress
11. Run  to see the new polygon balance
    ```
    npx hardhat run scripts/getBalance.js --network mumbai
    ```
### Resources
https://wiki.polygon.technology/docs/pos/design/bridge/l1-l2-communication/fx-portal/#goerli

https://app.pinata.cloud/
