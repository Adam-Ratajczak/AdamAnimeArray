INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1090, CONCAT('Kuma Miko Specials'), CONCAT('Special episodes included in the Blu-ray and DVD boxes of Kuma Miko.'), 1, '2016-06-24', '2016-08-24', '', '16 min. per ep.', 'https://cdn.myanimelist.net/images/anime/12/79557.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2653, 1090, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2654, 1090, 9);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1183, 1090, 19);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1194, 1090, 2);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1195, 1090, 19);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (18708, 1090, 1, CONCAT('Episode 1'), '2016-06-24', 'https://mp4upload.com/embed-cy59swmnvacm.html');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (18709, 1090, 2, CONCAT('Episode 2'), '2016-08-24', 'https://www.mp4upload.com/embed-41ajsnuroyge.html');
