INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1325, CONCAT('Nana Recaps'), CONCAT('Nana Episode 11.5: Junko', CHAR(39), 's Room <br>Nana Episode 21.5: Junko', CHAR(39), 's Room 2 <br>Nana Episode 36.5: Junko', CHAR(39), 's Room 3 '), 1, '2006-06-21', '2007-01-10', '', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1095/112104.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (575, 1325, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3284, 1325, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3285, 1325, 3);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3286, 1325, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1429, 1325, 52);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (22668, 1325, 1, CONCAT('Junko', CHAR(39), 's Room 1'), '2006-06-21', 'https://ebd.cda.pl/800x450/236678763');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (22669, 1325, 2, CONCAT('Junko', CHAR(39), 's Room 2'), '2006-09-06', 'https://ebd.cda.pl/800x450/2366913e0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (22670, 1325, 3, CONCAT('Junko', CHAR(39), 's Room 3'), '2007-01-10', 'https://ebd.cda.pl/800x450/23670789d');
