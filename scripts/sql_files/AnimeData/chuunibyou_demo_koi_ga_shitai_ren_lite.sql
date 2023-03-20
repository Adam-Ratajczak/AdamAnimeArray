INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (333, CONCAT('Chuunibyou demo Koi ga Shitai! Ren Lite'), CONCAT('Short episodes aired on KyoAni', CHAR(39), 's official YouTube channel.'), 2, '2013-12-26', '2014-03-16', '', '4 min. per ep.', 'https://cdn.myanimelist.net/images/anime/7/57457.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (766, 333, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (767, 333, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (768, 333, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (769, 333, 8);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (371, 333, 14);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5735, 333, 1, CONCAT('Lite 1: Kotatsnail'), '2013-12-26', 'https://vk.com/video164863602_167791963');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5736, 333, 2, CONCAT('Lite 2: An Infection Called a Stye, a Hordeolum, or Perharps Just Beauty'), '2014-01-15', 'https://dood.so/e/ibdhldatb1p68ptn4xnpy6zbztiq');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5737, 333, 3, CONCAT('Lite 3: Tyrant', CHAR(39), 's Eye - Before the Storm'), '2014-01-29', 'https://dood.so/e/142kjrrc9xsto6to35wawdt0rxbkq5oh');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5738, 333, 4, CONCAT('Lite 4: Dekomori VS Nibutani 2'), '2014-02-12', 'https://www.mp4upload.com/embed-yj5ixv9n56v7.html');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5739, 333, 5, CONCAT('Lite 5: My Brother 3 - Camp'), '2014-02-26', 'https://yourupload.com/embed/8tP14qN6Vs6U');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5740, 333, 6, CONCAT('Lite 6: Archangel Summoning'), '2014-03-16', 'https://dood.so/e/49jbinynwx200vl13hhj6wz5bjyprxhe');