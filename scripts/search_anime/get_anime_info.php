<?php
    require_once("../connect_db.php");

    $anime  = $_POST["Anime"];

    $result = mysqli_query($conn, "SELECT * FROM animes WHERE id = $anime;");

    if(!$result){
        exit;
    }

    $field_count = mysqli_num_fields($result);
    while($row = mysqli_fetch_row($result)){
        for($i = 0; $i < $field_count; $i++){
            echo $row[$i] . ",";
        }
    }

    mysqli_close($conn);
?>