;(async () => {
  const res = await fetch('https://polkadot.subsquare.io/api/inspect/scanheight')
  const json = await res.json()
  console.log(json)
})();
