#!/bin/sh

NUM=`ps -c | grep esxi-power.sh | grep -v grep | wc -l`

if [ "${NUM}" -lt "1" ];then
    /home/pi/schedule-esxi-power/esxi-power.sh &
    echo "$(date): Ping daemon start" >> /home/pi/schedule-esxi-power/esxi-power.log
fi

exit 0
