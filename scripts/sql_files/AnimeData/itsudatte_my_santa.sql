INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (892, CONCAT('Itsudatte My Santa!'), CONCAT('Mai, a Santa in training, appears in front of an unlucky boy named Santa on Christmas Eve, promising him that she will make him happy for one night. '), 3, '2005-12-07', NULL, '', '28 min. per ep.', 'https://cdn.myanimelist.net/images/anime/11/2902.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (392, 892, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2165, 892, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2166, 892, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2167, 892, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2168, 892, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (974, 892, 128);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (15772, 892, 1, CONCAT('My Santa'), '2005-12-07', 'https://ebd.cda.pl/800x450/810967124');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (15773, 892, 2, CONCAT('Merry Christmas Once More'), '2005-12-07', 'https://www.youtube.com/embed/8O-Kw19AWTU');
