INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (127, CONCAT('Arifureta Shokugyou de Sekai Saikyou Specials'), CONCAT('Unaired episodes included with the Blu-ray releases of Arifureta Shokugyou de Sekai Saikyou.  '), 1, '2019-12-25', '2020-02-26', '', '8 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1634/102577.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (294, 127, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (295, 127, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (296, 127, 9);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (142, 127, 34);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (143, 127, 38);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (124, 127, 12);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (125, 127, 20);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1862, 127, 1, CONCAT('Yue', CHAR(39), 's Diary'), '2019-12-25', 'https://ebd.cda.pl/620x368/7261405f4');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1863, 127, 2, CONCAT('The Hot Spring Where Romance Blooms'), '2020-02-26', 'https://ebd.cda.pl/620x368/7261408b8');
