INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1822, CONCAT('Strike Witches: Operation Victory Arrow'), CONCAT('Operation Victory Arrow is set in the period between the end of Operation Mars in the second television series and the 2012 Strike Witches movie. The three 30-minute short stories depict the lives of the members who returned to their respective homes.<br>
<br>(Source: ANN)'), 3, '2014-12-12', '2015-07-31', '', '28 min. per ep.', 'https://cdn.myanimelist.net/images/anime/12/67859.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (1298, 1822, '"Connect Link"', ' by Yoko Ishida', 'js-theme-songs', 'https://open.spotify.com/track/4XVpxZPFnWa1d6fr41a6FJ')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4509, 1822, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4510, 1822, 3);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4511, 1822, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1975, 1822, 50);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (32752, 1822, 1, CONCAT('The Thunder of Saint-Trond'), '2014-12-12', 'https://ebd.cda.pl/620x368/439086993');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (32753, 1822, 2, CONCAT('The Goddess of the Aegean Sea'), '2015-03-13', 'https://ebd.cda.pl/620x368/439090249');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (32754, 1822, 3, CONCAT('The Bridge of Arnhem'), '2015-07-31', 'https://ebd.cda.pl/620x368/4390920bd');
