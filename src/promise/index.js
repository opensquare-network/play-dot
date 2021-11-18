const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const reject = (ms) => new Promise((resolve, reject) => setTimeout(reject, ms));

async function main() {
  await Promise.any([
    sleep(500),
    reject(50)
  ])

}

main().catch(e => {
  console.log('error')
  console.error(e)
})
