INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (917, CONCAT('Junjou Romantica OVA'), CONCAT('OVAs that come with the limited premium edition of volumes 16 and 20 of the manga series.'), 1, '2012-12-20', '2015-12-01', '', '22 min. per ep.', 'https://cdn.myanimelist.net/images/anime/6/60389.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (651, 917, '"Kawaranai Sora (変わらない空)"', ' by Luck Life (ラックライフ)', 'js-theme-songs', 'https://open.spotify.com/track/6GpfXouuCouwLunx7Ol2gG');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2220, 917, 17);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2221, 917, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2222, 917, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2223, 917, 7);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (999, 917, 46);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (16181, 917, 1, CONCAT('Pure Romance / Pure Egoist / Pure Terrorist'), '2012-12-20', 'https://ebd.cda.pl/800x450/8317005c5');
