INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (810, CONCAT('Hyakka Ryouran: Samurai Bride Specials'), CONCAT('Specials included on DVDs and Blu-rays.'), 1, '2013-06-26', '2013-11-27', '', '2 min. per ep.', 'https://cdn.myanimelist.net/images/anime/13/52085.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1988, 810, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1989, 810, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1990, 810, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (887, 810, 129);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (884, 810, 12);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (885, 810, 32);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (886, 810, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14620, 810, 1, CONCAT('Sasuke and Musashi at a Public Bath'), '2013-06-26', 'https://ebd.cda.pl/800x450/359633217');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14621, 810, 2, CONCAT('Kojiro', CHAR(39), 's Maid Training'), '2013-07-24', 'https://ebd.cda.pl/800x450/359642242');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14622, 810, 3, CONCAT('The Ultimate Swimsuit'), '2013-08-28', 'https://ebd.cda.pl/800x450/35964287d');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14623, 810, 4, CONCAT('Juicy Boobs Project'), '2013-09-25', 'https://ebd.cda.pl/800x450/3596404af');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14624, 810, 5, CONCAT('d', CHAR(39), 'Artagnan Report'), '2013-10-30', 'https://ebd.cda.pl/800x450/359640785');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14625, 810, 6, CONCAT('The Girls on the Beach'), '2013-11-27', 'https://ebd.cda.pl/800x450/359641350');