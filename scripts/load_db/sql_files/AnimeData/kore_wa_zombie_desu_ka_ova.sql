INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1075, CONCAT('Kore wa Zombie Desu ka? OVA'), CONCAT('Two OVAs released with the 8th and 10th volumes of the original novel. They fall chronologically between the first and second seasons.'), 1, '2011-06-10', '2012-04-24', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/12/36243.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (769, 1075, '"Ma・Ka・Se・Te Tonight (魔・カ・セ・テ Tonight)"', ' by Iori Nomizu', 'js-theme-songs', 'https://open.spotify.com/track/1VtS7IOUC8ADU6MSD2nfnC')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2613, 1075, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2614, 1075, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2615, 1075, 10);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2616, 1075, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1166, 1075, 46);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (18529, 1075, 1, CONCAT('Yes, This is 1% Miracle / Welcome, to the Danger Zone / The Sun Illuminates the Ground Most of the Year'), '2011-06-10', 'https://ebd.cda.pl/620x368/1813634a9');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (18530, 1075, 2, CONCAT('Is This a Zombie? Of the Dead: Yes, Thank You for This Encore'), '2012-04-24', 'https://ebd.cda.pl/620x368/181367980');
