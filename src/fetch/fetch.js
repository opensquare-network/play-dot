const fetch = require('node-fetch');

;(async () => {
  const res = await fetch('https://test-node-api.opensquare.io/karura/chain/height')
  const json = await res.json()
  console.log(json)
})();
