INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1346, CONCAT('Nekomonogatari: Kuro'), CONCAT('After surviving a vampire attack, Koyomi Araragi notices that his friend and savior, Tsubasa Hanekawa, has been acting strange. When he happens to cross paths with her on his way to a bookstore and sees she has a bandage on her face, he knows something must definitely be wrong. Araragi wants to help her, but Hanekawa assures him that her wound is just something she received at home and that he should not concern himself with it. But when a white cat with no tail is hit and killed by a car, the pair bury the creature and the real trouble begins.<br>
<br>When Araragi later pays a visit to his friend Meme Oshino and recounts the day', CHAR(39), 's events, he is informed what they have buried is actually an apparition, one perfect for Hanekawa in her current state. Tasked with finding his friend to confirm her safety, he discovers that she has attacked her parents, possessed by the "Sawari Neko." Now, it is up to Araragi to help Hanekawa as she once helped him.<br>
<br>[Written by MAL Rewrite]'), 1, '2012-12-31', NULL, 'Fall 2012', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1170/121597.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (945, 1346, '"perfect slumbers"', ' by Tsubasa Hanekawa (Yui Horie)', 'js-theme-songs', 'https://open.spotify.com/track/53PjoywYL1EuvQRN28QsJo')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3343, 1346, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3344, 1346, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3345, 1346, 10);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (3346, 1346, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (1452, 1346, 7);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (23626, 1346, 1, CONCAT('Tsubasa Family, Part One'), '2012-12-31', 'https://ebd.cda.pl/620x395/62841568a');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (23627, 1346, 2, CONCAT('Tsubasa Family, Part Two'), '2012-12-31', 'https://ebd.cda.pl/620x395/6284150c0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (23628, 1346, 3, CONCAT('Tsubasa Family, Part Three'), '2012-12-31', 'https://ebd.cda.pl/620x395/628415364');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (23629, 1346, 4, CONCAT('Tsubasa Family, Part Four'), '2012-12-31', 'https://ebd.cda.pl/620x395/7556359ea');
