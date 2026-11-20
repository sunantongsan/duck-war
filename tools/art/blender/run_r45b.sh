#!/bin/bash
cd /home/claude/duck
export YAW=45 ELEV=48.6 NOPAD=1 META=1
rm -f r45/logb
for k in camp barracks blenderG jarG jarR jarY lab pumpY redbarn stoveR tech castle hero; do for n in 1 2 3 4 5; do
  python3.11 build_def.py -- $k $n r45/$k$n 384 0 > /dev/null 2>&1
done; python3.11 build_def.py -- $k 3 r45/${k}3 384 0 rubble > /dev/null 2>&1; echo $k >> r45/logb; done
for k in sling boxtower mortar aa chef rocket fan lens; do for n in 1 2 3 4 5; do
  python3.11 build_def.py -- $k $n r45/$k$n 384 0 > /dev/null 2>&1
  python3.11 build_def.py -- $k $n r45/$k$n 384 0 rubble > /dev/null 2>&1
done; echo $k >> r45/logb; done
echo ALLDONE >> r45/logb
