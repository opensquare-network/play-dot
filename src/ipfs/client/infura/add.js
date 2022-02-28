const { getInfuraClient } = require("../infuraClient");
const { CID } = require("multiformats");

;(async () => {
  const client = getInfuraClient();

  const cids = [
    "bafybeigvbkfmhdgnqko4ev35wfecx7exiyg35gcr7rh45ywlpw2v62itye",
    "bafybeidzruwvbbhhohll7mif5rbuupkfoeeltjf6bi3meristpx7milt2a",
  ]

//   const str = `{
//   "title": "This is the title",
//   "content": "This is the content",
//   "language": "en"
// }`;
//   const added = await client.add(str)
//   console.log(added)
  for (const cid of cids) {
    const parsed = CID.parse(cid)
    console.log(parsed)
    console.log('v0', parsed.asCID.toV0().toString())
    const res = await client.pin.add(cid)
    console.log('res', res)
  }
})();
