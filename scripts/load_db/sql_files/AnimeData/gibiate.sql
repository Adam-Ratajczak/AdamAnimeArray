INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (601, CONCAT('Gibiate'), CONCAT('The story takes place in Japan. The year is 2030 and Earth has been completely overrun by a viral disease named "Gibia" that turns infected people into various different monsters, based on their age, sex, and race.<br>
<br>A samurai and a ninja from the early Edo period travel together through time and arrive in a ruined Japan to aid a professor working on a cure for the virus.<br>
<br>Together, they fight countless Gibia monsters, outlaws, and other fierce foes on their journey to save mankind.'), 1, '2020-07-15', '2020-09-30', 'Summer 2020', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1035/113446.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (424, 601, '"GIBIATE"', ' by Yoshida Brothers feat SUGIZO', 'js-theme-songs', 'https://open.spotify.com/track/1jJKptNrByFvupjHfLH5Gl')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1482, 601, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1483, 601, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1484, 601, 11);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (668, 601, 150);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (669, 601, 151);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (612, 601, 24);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (613, 601, 32);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11022, 601, 1, CONCAT('Spirited Away'), '2020-07-15', 'https://ebd.cda.pl/620x368/548768307');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11023, 601, 2, CONCAT('Beyond the Maelstrom'), '2020-07-22', 'https://ebd.cda.pl/620x368/55170955f');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11024, 601, 3, CONCAT('The Third Man'), '2020-07-29', 'https://ebd.cda.pl/620x368/55446513a');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11025, 601, 4, CONCAT('Danger Zone'), '2020-08-05', 'https://ebd.cda.pl/620x368/5577393c5');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11026, 601, 5, CONCAT('Evil VS Bushido'), '2020-08-12', 'https://ebd.cda.pl/620x368/5608956c2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11027, 601, 6, CONCAT('Desperate Situation'), '2020-08-19', 'https://ebd.cda.pl/620x368/5640344bf');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11028, 601, 7, CONCAT('Dream Road to Death'), '2020-08-26', 'https://ebd.cda.pl/620x395/8128634e9');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11029, 601, 8, CONCAT('Letter of Farewell'), '2020-09-02', 'https://ebd.cda.pl/620x368/5707514d0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11030, 601, 9, CONCAT('Until It All Burns Out'), '2020-09-09', 'https://ebd.cda.pl/620x368/5753162b2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11031, 601, 10, CONCAT('New Allies'), '2020-09-16', 'https://ebd.cda.pl/620x368/5794679c2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11032, 601, 11, CONCAT('Illusory Love'), '2020-09-23', 'https://ebd.cda.pl/620x368/583457072');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (11033, 601, 12, CONCAT('A Life', CHAR(39), 's End'), '2020-09-30', 'https://ebd.cda.pl/620x368/587414002');
