const { getApi } = require("./api");

(async () => {
  const api = await getApi();
  const address = "7KTvkdHvwFTWretzgAUwpvfSvYJGEFPe1zefbiguFRfxBVvk";
  const trackId = 0;
  api.query.convictionVoting.votingFor(address, trackId, (voting) => {
    const jsonVoting = voting?.toJSON();
    console.log("1 jsonVoting", JSON.stringify(jsonVoting));
  });

  api.query.convictionVoting.votingFor(address, trackId, (voting) => {
    const jsonVoting = voting?.toJSON();
    console.log("2 jsonVoting", JSON.stringify(jsonVoting));
  });

})();
