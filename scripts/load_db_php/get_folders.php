<?php
    function execute_sql($path){
        echo $path . ",";
    }

    function get_files($path){   
    $dir = new DirectoryIterator($path);
    foreach ($dir as $fileinfo) {
        if (!$fileinfo->isDot()) {
            execute_sql($path . "\\" . $fileinfo->getFilename());
        }
    }
    }
    
    get_files("..\\sql_files\\Tables");
    get_files("..\\sql_files\\StructuralData");
    get_files("..\\sql_files\\AnimeData");
?>