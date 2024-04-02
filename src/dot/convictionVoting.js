const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  const stakePlus = "152QidDC4QrtMCyRGiQmvrNyjntvMg2XouCSdoPSeqUNTvsq";
  const colorfulNotion = "121Rs6fKm8nguHnvPfG1Cq3ctFuNAVZGRmghwkJwHpKxKjbx";
  const entries = await api.query.convictionVoting.votingFor.entries("13EyMuuDHwtq5RD6w3psCJ9WvJFZzDDion6Fd2FVAqxz1g7K");
  console.log(entries);
  process.exit(0);
})();
