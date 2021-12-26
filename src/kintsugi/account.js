const { getApi } = require("./api");

async function main() {
  const alice = 'a3f1Q33MZ6B82T7rwQ1Ke1Qekzuxe8yRbfvRxkPh11jdsrTLR';
  const api = await getApi();
  const p = await api.query.treasury.proposals(0)
  console.log(p)
  // api.registry.createType('InterbtcPrimitivesCurrencyId', 'KINT');
  // const account = await api.query.tokens.accounts(alice, 12)
  // console.log(account);
}

main()
