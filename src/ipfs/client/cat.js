const { getClient } = require("./client");
const all = require("it-all");
const { u8aConcat, u8aToString } = require("@polkadot/util")

;(async () => {
  const client = getClient();

  // {"title":"This is the title","content":"This is the content","language":"en"}
  // const hash = "QmVgGPAeCX5cDNG7RGkmaWkfF7ZMYYnVA2m4G18jwEFxkU";

  // {
  //   "title": "This is the title",
  //   "content": "This is the content",
  //   "language": "en"
  // }
  const hash = "bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye"
  const data = await all(client.cat(hash));
  const str = u8aToString(u8aConcat(...data))
  console.info(str)
})()
