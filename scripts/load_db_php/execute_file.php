<?php
    function run_sql_file($conn, $location){
        //load file
        $commands = file_get_contents($location);
        $fe = fopen('err.txt', 'a')or die("Unable to open file!");

        //delete comments
        $lines = explode("\n",$commands);
        $commands = '';
        foreach($lines as $line){
            $line = trim($line);
            if( $line && !startsWith($line,'--') ){
                $commands .= $line . "\n";
            }
        }

        //convert to array
        $commands = explode(";", $commands);

        //run commands
        $total = $success = 0;
        foreach($commands as $command){
            if(trim($command)){
                if(mysqli_query($conn, $command)){
                    $success++;
                }else{
                    fwrite($fe, $command . ";" . PHP_EOL);
                }
                $total += 1;
            }
        }

        fclose($fe);

        //return number of successful queries and total number of queries found
        return array(
            "success" => $success,
            "total" => $total
        );
    }


    // Here's a startsWith function
    function startsWith($haystack, $needle){
        $length = strlen($needle);
        return (substr($haystack, 0, $length) === $needle);
    }

    $p = $_POST["path"];

    require_once("connect_db.php");

    run_sql_file($conn, $p);

    mysqli_close($conn);
?>