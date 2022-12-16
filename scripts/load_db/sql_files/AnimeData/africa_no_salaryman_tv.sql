INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (35, CONCAT('Africa no Salaryman (TV)'), CONCAT('Africa no Salaryman is a slapstick workplace comedy that follows the adventures of kind Lion, jaded Lizard, and perverted Toucan, as they trudge through office life while also becoming caught up in antics no regular office worker should. <br>
<br>Of course, most of these are the fault of Toucan, whose selfish actions and lack of filter still haven', CHAR(39), 't gotten him fired. It', CHAR(39), 's up to Lizard and Lion to keep themselves out of trouble and hang on to their jobs at the office. But trouble is never too far away from these savannah-treading folk.<br>
<br>[Written by MAL Rewrite]'), 1, '2019-10-07', '2019-12-23', 'Fall 2019', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1937/102309.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (24, 35, '"Soul Flag"', ' by Hiro Shimono', 'js-theme-songs', 'https://open.spotify.com/track/1DvqDznMl6WKQuZXliI76f')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (82, 35, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (83, 35, 8);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (39, 35, 26);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (47, 35, 23);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (48, 35, 17);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (378, 35, 1, CONCAT('Africa Pervert'), NULL, 'https://ebd.cda.pl/620x368/812856526');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (379, 35, 2, CONCAT('Africa Corporate Drone'), NULL, 'https://ebd.cda.pl/620x395/8128574d7');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (380, 35, 3, CONCAT('Africa Flower-Viewing Parties'), NULL, 'https://ebd.cda.pl/620x368/8128580d8');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (381, 35, 4, CONCAT('Africa Mascot Characters'), NULL, 'https://ebd.cda.pl/620x368/8128583f4');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (382, 35, 5, CONCAT('Africa Job Search'), NULL, 'https://ebd.cda.pl/620x368/812856818');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (383, 35, 6, CONCAT('Africa Nasty Coworker'), NULL, 'https://ebd.cda.pl/620x368/812857114');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (384, 35, 7, CONCAT('Africa Company Trip'), NULL, 'https://ebd.cda.pl/620x368/8128577e2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (385, 35, 8, CONCAT('Africa Post-Vacation'), NULL, 'https://ebd.cda.pl/620x368/8128586f6');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (386, 35, 9, CONCAT('Africa Loan Sharks'), NULL, 'https://ebd.cda.pl/620x368/6125744a2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (387, 35, 10, CONCAT('Africa Play-by-Play Commentator'), NULL, 'https://drive.google.com/file/d/1CehrIPJY5y98Tirs4eKWUh3nrKhLp5uh/preview');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (388, 35, 11, CONCAT('Africa BBQ'), NULL, 'https://ebd.cda.pl/620x368/6247754f0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (389, 35, 12, CONCAT('Africa Salaryman'), NULL, 'https://ebd.cda.pl/620x368/62477339e');
