;(async () => {
  const { CID } = await import("multiformats");
  const isCid = CID.parse("QmaK8dXReqCeMmM2wKmF7N6bjKauW9SBWe6vh2kPR7D9PQ")
  const isCid2 = CID.parse("bafkreie42easioag2shgdozwgitvey5gjq7wr3jn24xohuwmipdlwyempq")
  debugger

  console.log('isCid', "abc", isCid)
})()
