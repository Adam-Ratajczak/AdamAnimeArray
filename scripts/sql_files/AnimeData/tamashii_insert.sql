INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1851, CONCAT('Tamashii Insert'), CONCAT('Half a year after Naoto Takahashi', CHAR(39), 's father got remarried, he hasn', CHAR(39), 't gotten used to the new family members: his stepmother, Sachiko, and his new little sister, Yui. One night as he tries to figure out how to smooth things over with his sister, he gets an app to allows him to take over someone else', CHAR(39), 's body.'), 2, '2017-07-07', '2017-10-06', '', '17 min. per ep.', 'https://cdn.myanimelist.net/images/anime/3/89399.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4591, 1851, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4592, 1851, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4593, 1851, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4594, 1851, 4);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4595, 1851, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (2005, 1851, 75);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (33163, 1851, 1, CONCAT('First Contact with Female Body'), '2017-07-07', 'https://ebd.cda.pl/800x450/6868912df');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (33164, 1851, 2, CONCAT('I’m Going to Hurt God’s Body'), '2017-10-06', 'https://ebd.cda.pl/800x450/686891584');
