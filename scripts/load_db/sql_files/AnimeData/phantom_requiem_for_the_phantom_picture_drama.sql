INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1465, CONCAT('Phantom: Requiem for the Phantom Picture Drama'), CONCAT('DVD/BD specials.'), 1, '2009-07-24', '2010-02-25', '', '6 min. per ep.', 'https://cdn.myanimelist.net/images/anime/3/23998.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3637, 1465, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3638, 1465, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3639, 1465, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3640, 1465, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1571, 1465, 14);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1610, 1465, 12);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1611, 1465, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (26294, 1465, 1, CONCAT('Acting School'), '2009-07-24', 'https://www.youtube.com/embed/H03YsBEd-R8');
