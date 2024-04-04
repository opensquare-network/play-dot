const cron = require("cron");
const { CronJob } = require("cron");

(() => {
  const job = new CronJob(
    '* 34 * * * *', // cronTime
    function () {
      console.log('You will see this message every second');
    }, // onTick
    null, // onComplete
    true, // start
    // 'America/Los_Angeles' // timeZone
    'Asia/Shanghai'
  );
  // job.start() is optional here because of the fourth parameter set to true.
})();
