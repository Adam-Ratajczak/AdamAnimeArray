INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1386, CONCAT('Nu Wushen de Canzhuo'), CONCAT('Join the table with Valkyries this summer for a feast of mouth-watering food and heartwarming memories.'), 4, '2019-06-28', '2019-08-30', '', '5 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1441/102035.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3444, 1386, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3445, 1386, 15);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1492, 1386, 103);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1493, 1386, 212);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (24256, 1386, 1, CONCAT('Bronya', CHAR(39), 's Special Borscht'), '2019-06-28', 'https://mixdrop.co/e/9n1ve4dkao69l0/');
