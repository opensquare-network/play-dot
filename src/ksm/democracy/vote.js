const { getApi } = require("../api");

;(async () => {
  const api = await getApi();
  const delegation = 'D3icRvk43Bj69ChTPkx5v4pEQKGqDY95hHXiBB1JBFVwtvP'
  const direct = 'GwCVDk8c1QgdJnWLHJn3rfPEYW9sUce3zSUrXaM7kxVWvLw'
  // const v = await api.query.democracy.votingOf(direct);
  const v = await api.query.democracy.votingOf(delegation);
  console.log('')
})()
