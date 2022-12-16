INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (395, CONCAT('Date A Live IV'), CONCAT('Despite the numerous challenges he has overcome so far, Shidou Itsuka', CHAR(39), 's mission with Ratatoskr is far from over. In a departure from his daily routine, Shidou encounters a starving woman lying on the street and ends up helping her. After the two arrive at her apartment, the woman introduces herself as Nia Honjou—a popular manga artist working under a pen name. However, cutting straight to the chase, Nia reveals that she is also a Spirit and is aware of Shidou', CHAR(39), 's secret operation.<br>
<br>Interested in seeing his charisma firsthand, Nia challenges Shidou to win her over on a date. As he strives for an opportunity to seal her powers, Shidou learns more about Nia and her history with Deus Ex Machina Industries, a name he is all too familiar with...<br>
<br>[Written by MAL Rewrite]<br>'), 1, '2022-04-08', '2022-06-24', 'Spring 2022', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1368/121281.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (285, 395, '"OveR"', ' by Miyu Tomita', 'js-theme-songs', 'https://open.spotify.com/track/4zkoAH6gFmFXkGI4oIbUDf')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (928, 395, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (929, 395, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (930, 395, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (442, 395, 113);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (422, 395, 12);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (423, 395, 3);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (424, 395, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (6781, 395, 3, CONCAT('What', CHAR(39), 's Yours Is Mine.'), '2022-04-22', 'https://ebd.cda.pl/620x368/10678459dc');
