array=(190 220 180 140 150 130 240 210 160 200 255)
for i in "${array[@]}"
do
   :
   node /Users/blablo/Projects/mexilist/spidermex/spiderman.js 1510 $i
   sleep 200
done

