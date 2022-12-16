INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1773, CONCAT('So Ra No Wo To Specials'), CONCAT('Two extra episodes included in the Blu-ray and DVD volumes 4 and 7 of "Sora no Woto".<br>
<br>The first, episode 7.5, takes place during the series. Felicia proposes a mock battle between the maidens after Kanata sees Rio opening the door to the distillery. If Kanata can win, they', CHAR(39), 'll tell her the truth about the secret room. However, things get out of hand when alcohol gets involved!<br>
<br>The second, episode 13, takes place after the series ends. One of the local children asks Kanata what her dream is. Unable to answer, Kanata talks to the other characters about their dreams and goals.'), 1, '2010-06-23', '2010-09-22', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/13/20884.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (1253, 1773, '"Hikari no Senritsu"', ' by Kalafina', 'js-theme-songs', 'https://open.spotify.com/track/4kGCEIEGq8R8k3PBGZHAMW')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4398, 1773, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4399, 1773, 9);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1916, 1773, 19);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1973, 1773, 2);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1974, 1773, 19);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (31972, 1773, 1, CONCAT('Feast: The Fortress at War'), '2010-06-23', 'https://ebd.cda.pl/800x450/6712673bb');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (31973, 1773, 2, CONCAT('Sounds of the Skies: Beyond the Dream'), '2010-09-22', 'https://ebd.cda.pl/800x450/6712688fd');
