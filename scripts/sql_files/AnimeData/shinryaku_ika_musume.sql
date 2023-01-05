INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1722, CONCAT('Shinryaku!! Ika Musume'), CONCAT('Original anime DVD bundled with the 12th, 14th, and 17th volumes of the manga.'), 1, '2012-08-08', '2014-09-08', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/4/39055.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (718, 1722, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4278, 1722, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4279, 1722, 8);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1860, 1722, 30);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30997, 1722, 1, CONCAT('Ink You Can Break It? / Squidn', CHAR(39), 't That Normal? / Wanna Play Hide and Seak?'), '2012-08-08', 'https://ebd.cda.pl/620x395/612719604');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30998, 1722, 2, CONCAT('Is That a Squiddie Pool? / Squidn', CHAR(39), 't This Your Mom? / Inking a Message in a Bottle?'), '2013-06-07', 'https://ebd.cda.pl/620x395/6127199d3');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30999, 1722, 3, CONCAT('Isn', CHAR(39), 't That a Helper? / Won', CHAR(39), 't You Be Found Out? / Aren', CHAR(39), 't You a Police Officer?'), '2014-09-09', 'https://ebd.cda.pl/620x395/612720280');
