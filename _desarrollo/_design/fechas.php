<?php

    $date1 = '2021-11-30';
    $date2 = '2021-12-05';


    $dateStart = new DateTime( $date1);
    $dateEnd   = new DateTime( $date2);
    $diff = $dateStart->diff($dateEnd);
    $daysCount = $diff->days;

   

    for ($i = 0; $i <=$daysCount; $i++)
    {
        
        
        $dateSet = date('Y-m-d', strtotime( $date1 . " +". $i ." day" ));
        echo $dateSet . '<br>';
    }

   
   //echo $daysCount;