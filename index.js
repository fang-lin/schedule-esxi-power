const { execSync } = require('child_process');
const moment = require('moment');
const { workday, holiday } = require('./holiday');

const POWER_ON = 'wakeonlan 00:FD:45:FC:87:7D';
const PING = 'ping -c 1 -W 5 192.168.1.100 > /dev/null';
const POWER_OFF = 'ssh -i /home/pi/.ssh/esxi root@192.168.1.100 \"/bin/shutdown.sh; halt\"';

function isOnlineTime() {
  // online from 6PM to 9AM
  // online in holiday
  // online saturday and sunday without workday

  const now = new Date();
  const day = now.getDay();

  const current = moment(now);
  const today = current.format('YYYY-M-d');
  const hour = current.format('H') - 0;

  return (
    hour > 18 || hour < 9 ||
    holiday.indexOf(today) > 0 ||
    (day === 0 || day === 6) && workday.indexOf(today) === -1
  );
}

setInterval(() => {

  let accessible = true;

  try {
    execSync(PING);
  } catch (e) {
    accessible = false;
  }

  try {

    if (accessible && !isOnlineTime()) {

      console.log('');
      console.log(`${(new Date).toString()}`);
      console.log(POWER_OFF);

      execSync(POWER_OFF);
    }

    if (!accessible && isOnlineTime()) {

      console.log('');
      console.log(`${(new Date).toString()}`);
      console.log(POWER_ON);

      execSync(POWER_ON);
    }
  } catch (e) {

  }
}, 1000 * 60 * 3);
