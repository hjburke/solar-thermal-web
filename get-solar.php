<?php

$lastCollector=0;
$lastTank1=0;
$lastTank2=0;
$lastPool=0;

$data='temp';
$fromDate='2015-01-01';
$toDate='2099-12-31';

if ($_GET["data"] ){
    $data = $_GET["data"];
}
if ($_GET["fromDate"] ){
    $fromDate = $_GET["fromDate"];
}
if ($_GET["toDate"] ){
    $toDate = $_GET["toDate"];
}
if ($_GET["range"] ){
    $range = $_GET["range"];
}



$db = new PDO('mysql:host=127.0.0.1;port=3306;dbname=homeautomation','root','disney2002');

if (isset($range)) {
    $goback = 0;

    if ($range === '12h') {
        $goback= 12 * 60 * 60;
    }
    else if ($range === '6h') {
        $goback= 6 * 60 * 60;
    }

    $now = time();
    $fromDate=date('Y-m-d H:i:s', $now - $goback);
    $toDate=date('Y-m-d H:i:s', $now);
#echo $fromDate."<br>";
#echo $toDate."<br>";
}

    if ($data === 'temp') {
        $stmt = $db->prepare('SELECT UNIX_TIMESTAMP(sampleTime),round(tempCollector),round(tempTank1),round(tempTank2),round(tempPool) FROM solarThermal WHERE sampleTime>=:fromDate AND sampleTime<=:toDate');
    }
    else {
        $stmt = $db->prepare('SELECT UNIX_TIMESTAMP(sampleTime),speedPump,valveTank1,valveTank2,valvePool FROM solarThermal WHERE sampleTime>=:fromDate AND sampleTime<=:toDate');
    }


$stmt->execute(array(':fromDate' => $fromDate, ':toDate' => $toDate));

$results = '[';
$firstRow=TRUE;
while ($row = $stmt->fetch()) {
    if (
        $row[1] != $lastCollector ||
        $row[2] != $lastTank1 ||
        $row[3] != $lastTank2 ||
        $row[4] != $lastPool ||
        $data == 'valves'
    ) {
        if (!$firstRow) {
            $results .= ',';
        }
        else {
            $firstRow=FALSE;
        }

        if ($row[1] == 1000) { $row[1]=32; }
        if ($row[4] == 1000) { $row[4]=32; }

        $results .= '['.($row[0]*1000).','.$row[1].','.$row[2].','.$row[3].','.$row[4].']';
        $lastCollector = $row[1];
        $lastTank1 = $row[2];
        $lastTank2 = $row[3];
        $lastPool = $row[4];
    }
}

$results .= ']';
echo $results;

