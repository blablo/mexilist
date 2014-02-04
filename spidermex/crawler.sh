#!/bin/bash

cities=(110 230 310 320 610 620 740 750 760 810 820 905 915 920 930 940 955 980 1010 1180 1120 1130 1210 1220 1240 1310 1410 1510 1540 1550 1560 1570 1580 1590 1610 1720 1810 1820 1940 1950 1960 2110 2210 2310 2320 2330 2430 2510 2530 2540 2610 2630 2730 2810 3060 3110)

array=(20 30 40 60 70 80 100 220 190 180 140 150 130 240 210 160 200 255 410 450 460 412 440 470 430 420 415 480 330 340 350 325 360 370 380 385 530 510 532 515 512 535 310 270 280 300 560 565 550 570)


echo date > 'spider.log'

entra=0
echo '1' > 'status.txt'
status=`cat status.txt`
city=`cat ciudad.txt`


while [ "${status}" = 1 ]; do
    
    for r in "${cities[@]}"
    do
        :


        if [ -n $city ]
        then

            if [ $city = $r ]
            then
                entra=1
            fi
        else
            entra=1
        fi


        if [ "${entra}" = 1 ]
        then


            for i in "${array[@]}"
            do
                :
                
		status=`cat status.txt`
		if [ "${status}" != 1 ]; then
		    echo "break"
		    break
		else
		    echo "${r}-${i}" >> 'spider.log'
		    echo $r > 'ciudad.txt'
		    node /Users/blablo/Projects/mexilist/spidermex/spiderman.js $r $i		    
                    echo "${r}-${i}" >> 'spider.log'
                    echo "---" >> 'spider.log'

		fi

            done
        fi
    done

    
done

echo date >> 'spider.log'