const { sortAddresses } = require("@polkadot/util-crypto");

(async () => {
  const address = [
    "5GnNHt39B9te5yvhv5qF494u6FF24Ld6MxEGFP4UanGJyag8",
    "5C4qRfw4xxyRk5TPTk9HMYG9sxQ7LFGxqqaa3CLQoc1hLfzg",
    "5Gv1aoT3z2rt2jdcWHgWC9AWjiJ4dYXsNZq36ajJJxJS8m1j",
    "5EU2XEcn6mt5NkgyFsreo2kai5KZEyT4Z7QovFXofq41vDWt",
    "5CyH9X4sZR9KjF8tMvq8vhkYhwccv73X1Gee7Cu4g8rY4kdu"
  ]

  console.log(sortAddresses(address))
})();
