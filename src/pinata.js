require("dotenv").config();

const pinataSDK = require('@pinata/sdk');
const pinata = pinataSDK(process.env.PINATA_API_KEY, process.env.PINATA_SECRET_KEY);

async function main() {
  const result = await pinata.pinJSONToIPFS({
    hello: 'world'
  });
  console.log(result)

  const ipfsHash = result.IpfsHash;
  console.log(ipfsHash)
}

main().catch(console.error)
