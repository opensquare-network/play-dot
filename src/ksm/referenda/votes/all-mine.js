const { getApi } = require("../../api");

(async () => {
  const api = await getApi();
  const entries = await api.query.convictionVoting.votingFor.entries("ESgz7GLVW7BL5DhRgpVnxSXVwaKt4ytWcrf52TY1GQD1cEb");

  console.log(entries);
})();
