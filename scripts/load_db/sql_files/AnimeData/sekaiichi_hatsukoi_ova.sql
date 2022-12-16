INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1652, CONCAT('Sekaiichi Hatsukoi OVA'), CONCAT('Two OVA episodes featuring additional stories. <br>
<br>Episode 0: Ritsu and Takano used to date back in high school, but broke up due to a misunderstanding. This is that story. <br>
<br>Episode 12.5: Hatori and Chiaki go to visit the latter', CHAR(39), 's family. It', CHAR(39), 's really awkward in many, many ways. '), 1, '2011-03-22', '2011-09-27', '', '21 min. per ep.', 'https://cdn.myanimelist.net/images/anime/11/35863.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (1164, 1652, '"Prologue"', ' by Hijiri Anze', 'js-theme-songs', 'https://open.spotify.com/track/4DDl7UKuOjf9mn14iwqdfJ');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (699, 1652, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4112, 1652, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4113, 1652, 7);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1778, 1652, 31);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30070, 1652, 1, CONCAT('No Love', CHAR(39), 's Like to the First.'), '2011-03-22', 'https://drive.google.com/file/d/0B2mEXneROmcFV3htY3U2eDZBQ3c/preview');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30071, 1652, 2, CONCAT('The Quarrel of Lovers is the Renewal of Love.'), '2011-09-27', 'https://ebd.cda.pl/800x450/515596261');
