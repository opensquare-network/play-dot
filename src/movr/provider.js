const { ethers } = require("ethers")

const network = {
  chainId: 1285,
  name: 'moonriver'
};

const providerURL = "wss://wss.api.moonriver.moonbeam.network";
// Define Provider
const provider = new ethers.providers.WebSocketProvider(providerURL, network);

const httpUrl = "https://rpc.api.moonriver.moonbeam.network";
// Define Provider
const httpProvider = new ethers.providers.StaticJsonRpcProvider(httpUrl, network);


module.exports = {
  wsProvider: provider,
  httpProvider,
}
