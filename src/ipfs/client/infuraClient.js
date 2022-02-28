require("dotenv").config();

const { create } = require("ipfs-http-client");
let client;

const projectId = process.env.INFURA_PROJECT_ID;
const projectSecret = process.env.INFURA_PROJECT_SECRET;

const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

function getInfuraClient() {
  if (!client) {
    client = create({
      host: 'ipfs.infura.io',
      port: 5001,
      protocol: 'https',
      timeout: '10m',
      headers: {
        authorization: auth,
      },
    })
  }

  return client
}

module.exports = {
  getInfuraClient,
}
