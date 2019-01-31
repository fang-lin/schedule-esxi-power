#!/bin/sh

NUM=`ps -c | grep schedule-esxi-power/esxi-power.js | grep -v grep | wc -l`

if [ "${NUM}" -lt "1" ];then
    node /home/pi/schedule-esxi-power/esxi-power.js &
    echo "$(date): Ping daemon start" >> /home/pi/schedule-esxi-power/esxi-power.log
fi

exit 0
