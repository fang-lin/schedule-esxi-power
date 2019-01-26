const schedule = require('node-schedule');
const { execSync } = require('child_process');
const { workday, holiday } = require('./holiday');
const opt = {
  cwd: process.cwd(),
  env: process.env,
};

const powerOn = 'wakeonlan 00:FD:45:FC:87:7D';
const powerOff = 'ssh -i /home/pi/.ssh/esxi root@192.168.1.100 \"/bin/shutdown.sh; halt\"';

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
    console.log(`${fireDate.toString()} shutdown!`);
    const output = execSync(powerOff, opt);
    console.log(output);
  }
});

// power on job
schedule.scheduleJob({
  year: 2019,
  hour: 18,
}, fireDate => {
  console.log(`${fireDate.toString()} WOL!`);
  execSync(powerOn, opt);
});
