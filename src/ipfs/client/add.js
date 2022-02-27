const { getClient } = require("./client");

(async () => {
  try {
    // const client = create('http://127.0.0.1:5001')
    // const client = create('https://ipfs.dotask.cc')
    // const client = create('https://ipfs.infura.io:5001')
    const client = getClient();
    const added = await client.add(JSON.stringify({
      "title": "This is the title",
      "content": "This is the content",
      "language": "en"
    }))
    console.log('added', added)

    // added {
    //   path: 'QmVgGPAeCX5cDNG7RGkmaWkfF7ZMYYnVA2m4G18jwEFxkU',
    //     cid: CID(QmVgGPAeCX5cDNG7RGkmaWkfF7ZMYYnVA2m4G18jwEFxkU),
    //     size: 85
    // }

  } catch (e) {
    console.error(e)
  }
})()
