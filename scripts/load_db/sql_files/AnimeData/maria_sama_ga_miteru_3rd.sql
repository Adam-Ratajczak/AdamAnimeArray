INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1223, CONCAT('Maria-sama ga Miteru 3rd'), CONCAT('Summer has arrived, and the students of Lillian Girls', CHAR(39), ' Academy are on break! Yumi and Sachiko head out to the Ogasawara family', CHAR(39), 's summer home, but what was supposed to be a relaxing vacation takes a turn for the worse when some of Sachiko', CHAR(39), 's old acquaintances drop by for tea. These rich and snobby debutantes don', CHAR(39), 't think Yumi is worthy of Sachiko', CHAR(39), 's affection and they', CHAR(39), 're out to make this summer one she', CHAR(39), 'll regret.<br>
<br>(Source: RightStuf)'), 1, '2006-12-29', '2007-07-25', '', '50 min. per ep.', 'https://cdn.myanimelist.net/images/anime/6/75209.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (857, 1223, '"Chercher～シャルシェ～"', ' by KOTOKO', 'js-theme-songs', 'https://open.spotify.com/track/6CUpf9G23h3KW1eL8keuWX');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2991, 1223, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (2992, 1223, 16);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1321, 1223, 46);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (21012, 1223, 1, CONCAT('The Lambs', CHAR(39), ' Vacation'), '2006-11-29', 'https://ebd.cda.pl/800x450/384551552');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (21013, 1223, 2, CONCAT('Operation OK For Short'), '2007-01-31', 'https://ebd.cda.pl/800x450/3845518f3');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (21014, 1223, 3, CONCAT('Cool Breeze'), '2007-03-28', 'https://ebd.cda.pl/800x450/384552175');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (21015, 1223, 4, CONCAT('Ready, Go!'), '2007-05-30', 'https://ebd.cda.pl/800x450/384552750');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (21016, 1223, 5, CONCAT('Hello Sister!'), '2007-07-25', 'https://ebd.cda.pl/800x450/3845530eb');
