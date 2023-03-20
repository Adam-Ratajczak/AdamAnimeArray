INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (178, CONCAT('BanG Dream! Morfonication'), CONCAT('Two special episodes featuring a violin rock band, Morfonica. '), 5, '2022-07-28', '2022-07-29', '', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1411/124237.jpg');
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (201, 178, 60);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2512, 178, 1, CONCAT('Summer Morfonica Project'), '2022-07-28', 'https://ebd.cda.pl/620x368/1193534099');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2513, 178, 2, CONCAT('Shining Days'), '2022-07-29', 'https://ebd.cda.pl/620x368/11940230a2');