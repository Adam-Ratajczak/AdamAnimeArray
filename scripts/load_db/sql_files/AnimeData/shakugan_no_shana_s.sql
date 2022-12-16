INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1687, CONCAT('Shakugan no Shana S'), CONCAT('Find out what happens when Yuji accidentally triggers a found Treasure Tool while it', CHAR(39), 's pointed at Shana! Then, Yuji teams up with Wilhelmina to stalk their fiery friend—whose secrecy has become unsettling. Finally, in a two-part special, Shana tracks a Denizen', CHAR(39), 's trail by sorting through a Torch', CHAR(39), 's memories for clues. Her sleuth skills reveal a teenage girl', CHAR(39), 's heartwarming last days and a predator with a serious identity crisis!<br>
<br>(Source: FUNimation)'), 1, '2009-10-23', '2010-09-29', '', '28 min. per ep.', 'https://cdn.myanimelist.net/images/anime/10/17680.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (1192, 1687, '"Prophecy"', ' by Mami Kawada', 'js-theme-songs', 'https://open.spotify.com/track/4sivv3boBcqzFArR6qO3kG')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4183, 1687, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4184, 1687, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4185, 1687, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4186, 1687, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4187, 1687, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1820, 1687, 31);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1868, 1687, 30);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (1869, 1687, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30563, 1687, 1, CONCAT('Reshuffle'), '2009-10-23', 'https://drive.google.com/file/d/1Sm3egWL0r_Q6s0cSwW1X3mgPHJYb4Kfh/preview');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30564, 1687, 2, CONCAT('Domicile'), '2010-02-26', 'https://ebd.cda.pl/800x450/1488546c8');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30565, 1687, 3, CONCAT('Overture Part One'), '2010-05-25', 'https://ebd.cda.pl/620x395/5888753ce');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (30566, 1687, 4, CONCAT('Overture Part Two'), '2010-09-29', 'https://ebd.cda.pl/x/1488551fa');
