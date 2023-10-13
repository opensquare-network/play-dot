const { request, gql } = require("graphql-request");

const document = gql`
  {
    scanHeight
  }
`;

(async () => {
  const data = await request("https://kusama-identity-api.statescan.io/graphql", document);
  console.log(data.scanHeight);
})();
