<?php
    require_once("../connect_db.php");

    $title  = $_POST["Title"];
    $genre  = $_POST["Genre"];
    $theme  = $_POST["Theme"];
    $age    = $_POST["Age"];
    $Studio = $_POST["Studio"];

    $result = mysqli_query($conn, "
    SELECT DISTINCT a.AnimeID FROM ((((
        Animes a LEFT JOIN (
            SELECT AnimeID FROM AnimeGenres WHERE GenreID IN((
                SELECT GenreID FROM Genres WHERE $genre
            ))
        ) ag ON a.AnimeID = ag.AnimeID) LEFT JOIN (
            SELECT AnimeID FROM AnimeThemes WHERE ThemeID IN((
                SELECT ThemeID FROM Themes WHERE $theme
            ))
        ) ath ON a.AnimeID = ath.AnimeID) LEFT JOIN (
            SELECT AnimeID FROM AnimeDemographics WHERE GroupID IN((
                SELECT GroupID FROM Demographics WHERE $age
            ))
        ) ad ON a.AnimeID = ad.AnimeID) LEFT JOIN (
            SELECT AnimeID FROM AnimeProducers WHERE ProducerID IN((
                SELECT ProducerID FROM Producers WHERE $studio
            ))
        ) ast ON a.AnimeID = ast.AnimeID) WHERE $title ORDER BY a.AnimeTitle ASC;
    ");

    if(!$result){
        exit;
    }

    while($row = mysqli_fetch_row($result)){
        echo $row[0] . ",";
    }

    mysqli_close($conn);
?>