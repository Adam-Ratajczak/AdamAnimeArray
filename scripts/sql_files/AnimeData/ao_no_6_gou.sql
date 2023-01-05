INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (101, CONCAT('Ao no 6-gou'), CONCAT('The once famous and well respected scientist Zorndyke has bred a new genre of living being, one that thrives on the oceans and lives to destroy humans. Zorndyke believes it is time that the humans were relieved of their rule of the earth. It is up to Blue Submarine No. 6 and the rest of the Blue fleet to put an end to Zorndyke', CHAR(39), 's madness and creations. <br>
<br>(Source: ANN)<br>'), 1, '1998-10-25', '2000-03-25', '', '32 min. per ep.', 'https://cdn.myanimelist.net/images/anime/3/20750.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (229, 101, 11);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (230, 101, 4);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (231, 101, 10);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (232, 101, 5);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (115, 101, 58);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (100, 101, 10);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (101, 101, 4);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1510, 101, 1, CONCAT('Blues'), NULL, 'https://ebd.cda.pl/620x395/787654388');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1511, 101, 2, CONCAT('Pilots'), NULL, 'https://ebd.cda.pl/620x395/7876547e2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1512, 101, 3, CONCAT('Hearts'), NULL, 'https://ebd.cda.pl/620x395/787655148');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1513, 101, 4, CONCAT('Minasoko'), NULL, 'https://ebd.cda.pl/620x395/7876539e8');
