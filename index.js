const schedule = require('node-schedule');
const { execSync } = require('child_process');
const { workday, holiday } = require('./holiday');
const opt = {
  cwd: process.cwd(),
  env: process.env,
};

// power off job
schedule.scheduleJob({
  year: 2019,
  hour: 9,
}, fireDate => {

  const year = fireDate.getFullYear();
  const month = fireDate.getMonth() + 1;
  const date = fireDate.getDate();
  const day = fireDate.getDay();

  const today = `${year}-${month}-${date}`;

  if (workday.indexOf(today) > -1 || 0 < day && day < 6 && holiday.indexOf(today) === -1) {

    execSync(`echo "${fireDate.toString()} shutdown!" >> ./power.log`, opt);
    const output = execSync('npm power:off', opt);
    execSync(`echo "${output}" >> ./power.log`, opt);
  }
});

// power on job
schedule.scheduleJob({
  year: 2019,
  hour: 18,
}, fireDate => {

  execSync(`echo "${fireDate.toString()} WOL!" >> ./power.log`, opt);
  execSync('npm power:on', opt);
});

// testing

// power off
schedule.scheduleJob({
  minute: 30,
}, fireDate => {

  execSync(`echo "${fireDate.toString()} shutdown!" >> ./power.log`, opt);
  const output = execSync('npm power:off', opt);
  execSync(`echo "${output}" >> ./power.log`, opt);
});

// power on job
schedule.scheduleJob({
  minute: 20,
}, fireDate => {

  execSync(`echo "${fireDate.toString()} WOL!" >> ./power.log`, opt);
  execSync('npm power:on', opt);
});
