<?php
    require_once("../connect_db.php");

    $title  = $_POST["Title"];
    $genre  = $_POST["Genre"];
    $theme  = $_POST["Theme"];
    $age    = $_POST["Age"];
    $Studio = $_POST["Studio"];

    $result = mysqli_query($conn, "
    SELECT DISTINCT a.AnimeID FROM ((((
        animes a LEFT JOIN (
            SELECT AnimeID FROM animegenres WHERE GenreID IN((
                SELECT GenreID FROM genres WHERE $genre
            ))
        ) ag ON a.AnimeID = ag.AnimeID) LEFT JOIN (
            SELECT AnimeID FROM animethemes WHERE ThemeID IN((
                SELECT ThemeID FROM themes WHERE $theme
            ))
        ) ath ON a.AnimeID = ath.AnimeID) LEFT JOIN (
            SELECT AnimeID FROM animedemographics WHERE GroupID IN((
                SELECT GroupID FROM demographics WHERE $age
            ))
        ) ad ON a.AnimeID = ad.AnimeID) LEFT JOIN (
            SELECT AnimeID FROM animeproducers WHERE ProducerID IN((
                SELECT ProducerID FROM producers WHERE $studio
            ))
        ) ast ON a.AnimeID = ast.AnimeID) WHERE $title;
    ");

    if(!$result){
        exit;
    }

    while($row = mysqli_fetch_row($result)){
        echo $row[0] . ",";
    }

    mysqli_close($conn);
?>