INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1471, CONCAT('Pikotarou no Lullaby Lullaby'), CONCAT('Pikotaro breaks new ground. Drawing inspiration from illustrations by director Taniguchi, he does the unthinkable: three-minute, scriptless fairy tale anime. Pikotaro is presented with classics loved around the world, including The Little Match Girl, Cinderella, and The Ugly Duckling. The mad genius who took the world by storm returns to bring you unique bedtime stories certain to rock you into absurd sleep.<br>
<br>(Source: Crunchyroll)'), 4, '2017-07-17', '2017-07-26', '', '2 min. per ep.', 'https://cdn.myanimelist.net/images/anime/5/88197.jpg');
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1577, 1471, 141);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (26353, 1471, 1, CONCAT('The Little Match Girl'), NULL, 'https://estream.to/embed-9sbbk3d4cmqn.html');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (26354, 1471, 2, CONCAT('Cinderella'), NULL, 'https://estream.to/embed-ji7lngqtsohb.html');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (26355, 1471, 3, CONCAT('The Ugly Duckling'), NULL, 'https://estream.to/embed-nfdnuths8sqi.html');
