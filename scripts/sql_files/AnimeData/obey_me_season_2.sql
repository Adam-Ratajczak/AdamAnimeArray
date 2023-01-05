INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1396, CONCAT('Obey Me! Season 2'), CONCAT('Second season of Obey Me!'), 1, '2022-07-22', NULL, '', '6 min.', 'https://cdn.myanimelist.net/images/anime/1950/124925.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3467, 1396, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3468, 1396, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3469, 1396, 5);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1503, 1396, 38);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1528, 1396, 20);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1529, 1396, 4);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1530, 1396, 15);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (24381, 1396, 5, CONCAT('Asmodeus', CHAR(39), 's Paradise'), NULL, 'https://desu-online.pl/player/dp_ffm.php?v=kb7h9ukhq');
