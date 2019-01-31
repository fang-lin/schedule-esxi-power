#!/bin/sh

NUM=`ps -c | grep ping.sh | grep -v grep | wc -l`

if [ "${NUM}" -lt "1" ];then
    /vmfs/volumes/datastore1/auto_shutdown/ping.sh &
    echo "$(date): Ping daemon start" >> /vmfs/volumes/datastore1/auto_shutdown/ping.log
fi

exit 0
