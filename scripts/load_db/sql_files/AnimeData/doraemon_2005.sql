INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (444, CONCAT('Doraemon (2005)'), CONCAT('Doraemon (2005) is the most recent anime series based on Fujiko Fujio', CHAR(39), 's manga of the same name. <br>
<br>It is the 2005 version of 1979 series, with certain changes in the animation and other things.<br>
<br>Doraemon is a cat-like robot who appears in the present to steer Nobita/Noby, who is a dumb, naive and clumsy boy on the right path in order to secure his future. Nobita', CHAR(39), 's love interest is Shizuka Minamoto/Sue, his frenemies are Takeshi Goda/Big G and Suneo/Sneech.<br>
<br>(Source: Wikipedia)'), 1, '2005-04-22', NULL, 'Spring 2005', '25 min.', 'https://cdn.myanimelist.net/images/anime/6/23935.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (316, 444, '"Yume o Kanaete Doraemon (夢をかなえてドラえもん)"', ' by 12 Girls Band (女子十二楽坊)', 'js-theme-songs', '')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1069, 444, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1070, 444, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1071, 444, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1072, 444, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (496, 444, 56);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (7856, 444, 1, CONCAT('Slow-Slow, Quick-Quick / Nobita', CHAR(39), 's Wife'), '2005-04-22', 'https://ebd.cda.pl/620x368/370187214');
