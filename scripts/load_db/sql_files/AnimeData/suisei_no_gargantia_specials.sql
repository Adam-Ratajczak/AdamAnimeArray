INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1828, CONCAT('Suisei no Gargantia Specials'), CONCAT('Episodes 14 and 15, released with the first and third BD/DVD volumes. '), 1, '2013-08-28', '2013-10-25', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/8/51509.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4523, 1828, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4524, 1828, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4525, 1828, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1982, 1828, 2);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (32845, 1828, 1, CONCAT('Abandoned Fleet'), '2013-08-28', 'https://video.sibnet.ru/shell.php?videoid=2983192');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (32846, 1828, 2, CONCAT('The Oracle', CHAR(39), 's Altar'), '2013-10-25', 'https://video.sibnet.ru/shell.php?videoid=2983194');
