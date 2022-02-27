const { create } = require("ipfs-http-client");
let client;

function getClient() {
  if (!client) {
    client = create({
      host: 'localhost',
      port: 5001,
      protocol: 'http',
      timeout: '2m'
    })
  }

  return client
}

module.exports = {
  getClient,
}
