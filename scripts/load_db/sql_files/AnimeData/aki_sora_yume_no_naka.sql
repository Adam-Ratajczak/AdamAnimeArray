INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (65, CONCAT('Aki-Sora: Yume no Naka'), CONCAT('Siblings Aki and Sora Aoi have been in a secret relationship ever since they confessed their feelings to each other on a rainy day. Sora', CHAR(39), 's twin sister Nami—unaware that his affections lie elsewhere—decides to have him join the Fashion Research Club at school in an attempt to set him up with their classmate, Kana Sumiya.<br>
<br>However, Nami', CHAR(39), 's actions mask painful truths. While her motives appear like those of a good sister trying to help her brother finally get a girlfriend, she is harboring secret, forbidden feelings of her own.<br>
<br>[Written by MAL Rewrite]<br>'), 3, '2010-07-30', '2010-11-17', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/12/23461.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (36, 65, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (150, 65, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (151, 65, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (76, 65, 8);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1014, 65, 1, CONCAT('Aki Sora: In a Dream (Part 1)'), '2010-07-30', 'https://ebd.cda.pl/800x450/6877786af');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1015, 65, 2, CONCAT('Aki Sora: In a Dream (Part 2)'), '2010-11-17', 'https://ebd.cda.pl/800x450/1518106c7');
