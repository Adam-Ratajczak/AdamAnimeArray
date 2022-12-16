INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (303, CONCAT('Cestvs: The Roman Fighter'), CONCAT('In the year 54 AD, 15-year-old slave fighter Cestvs desires one thing—an escape from his violent life. It is the wish Cestvs', CHAR(39), ' owner has promised to grant him, but only after he wins 100 battles. However, Cestvs quickly comes to terms with the fact that, as a slave, his life is expendable. After the death of his friend, the possibility of freedom is the only thing keeping him going. With a burning ambition to attain it, Cestvs embarks on a journey to earn himself back, even if it means fighting other slaves for the entertainment of the public.<br>
<br>[Written by MAL Rewrite]'), 2, '2021-04-15', '2021-06-24', 'Spring 2021', '22 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1291/114014.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (216, 303, '"Endeavor (エンデヴァー)"', ' by Dragon Ash', 'js-theme-songs', 'https://open.spotify.com/track/6Zfvgb67IZIeqHMT379hK2')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (696, 303, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (697, 303, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (698, 303, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (340, 303, 4);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5235, 303, 1, CONCAT('Fighting Slave Cestvs'), NULL, 'https://ebd.cda.pl/620x368/72626201a');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5236, 303, 2, CONCAT('A Different Kind of Fight'), NULL, 'https://ebd.cda.pl/620x368/73120211e');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5237, 303, 3, CONCAT('The Boxing Dogs'), NULL, 'https://ebd.cda.pl/620x368/736768389');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5238, 303, 4, CONCAT('Surviving Until Tomorrow'), NULL, 'https://ebd.cda.pl/620x368/7429519a7');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5239, 303, 5, CONCAT('Where Hope Can Be Found'), NULL, 'https://ebd.cda.pl/620x368/7477486ba');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5240, 303, 6, CONCAT('Separated From the Goddess'), NULL, 'https://video.sibnet.ru/shell.php?videoid=4321445');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5241, 303, 7, CONCAT('Caged Screams'), NULL, 'https://ebd.cda.pl/620x368/7661412e4');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5242, 303, 8, CONCAT('Epiphany'), NULL, 'https://ebd.cda.pl/620x368/766141576');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5243, 303, 9, CONCAT('The Lucky Man'), NULL, 'https://ebd.cda.pl/620x368/7749493ad');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5244, 303, 10, CONCAT('Quiet Groundwork'), NULL, 'https://ebd.cda.pl/620x368/7775562a9');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (5245, 303, 11, CONCAT('A New Battlefield'), NULL, 'https://ebd.cda.pl/620x368/788491112');
