INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (327, CONCAT('Chu-Bra!!'), CONCAT('The story centers on Nayu, a middle school girl who shocks her schoolmates on the first day of school by wearing black lace panties. She likes this kind of underwear, and she tries to "spread the word on the merits of [these kinds of] underwear" via an underwear club with her schoolmates, who are worried about their bodies', CHAR(39), ' development and which underwear to choose.<br>
<br>(Source: ANN)'), 1, '2010-01-04', '2010-03-22', 'Winter 2010', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1130/91352.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (233, 327, '"Choose Bright!!"', ' by Minori Chihara, Minako Kotobuki, Sayuri Yahagi and Yoko Hikasa', 'js-theme-songs', '');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (158, 327, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (750, 327, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (751, 327, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (365, 327, 44);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5678, 327, 12, CONCAT('Until I Met You'), '2010-03-22', 'https://ebd.cda.pl/620x395/801778740');
