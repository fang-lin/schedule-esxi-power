const schedule = require('node-schedule');
const { exec } = require('child_process');
const moment = require('moment');
const { workday, holiday } = require('./holiday');
const opt = {
  cwd: process.cwd(),
  env: process.env,
};

const POWER_ON = 'wakeonlan 00:FD:45:FC:87:7D';
const POWER_OFF = 'ssh -i /home/pi/.ssh/esxi root@192.168.1.100 \"/bin/shutdown.sh; halt\"';


// Power off job
schedule.scheduleJob('* 9 * * *', fireDate => {
  const today = moment(fireDate).format('YYYY-M-d');
  const day = fireDate.getDay();

  if (workday.indexOf(today) > -1 || 0 < day && day < 6 && holiday.indexOf(today) === -1) {
    console.log('');
    console.log(`${fireDate.toString()}`);
    console.log(POWER_OFF);
    exec(POWER_OFF, (err, stdout) => console.log(err || stdout));
  }
});

// Power on job
schedule.scheduleJob('0 * * * * *', fireDate => {
  console.log('');
  console.log(`${fireDate.toString()}`);
  console.log(POWER_ON);
  exec(POWER_ON, (err, stdout) => console.log(err || stdout));
});
