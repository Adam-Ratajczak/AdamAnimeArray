INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (197, CONCAT('Beatless Final Stage'), CONCAT('Arato Endou and his faithful hIE, Lacia, have come together once again to show the world that artificial intelligence, no matter how brilliant, can be shut down safely.<br>
<br>As they descend into the holding facility to confront Higgins, Lacia', CHAR(39), 's AI creator, the pair must fend off enemies from all fronts. Among them are Snowdrop, a rampant hIE hellbent on devouring Higgins, and Methode, a hIE who seeks vengeance against Lacia. The world', CHAR(39), 's super-intelligent AIs unanimously decide to terminate Lacia, whom they deem a threat to humanity.<br>
<br>With limited time and the odds stacked against them, will Arato and Lacia be able to truly join together in a society where humans and hIEs can coexist peacefully?<br>
<br>[Written by MAL Rewrite]<br>'), 1, '2018-09-26', '2018-09-28', 'Summer 2018', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1745/93307.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (141, 197, '"Truth."', ' by TrySail', 'js-theme-songs', 'https://open.spotify.com/track/2tZpMPYzE9XON8RD3auFWx')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (465, 197, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (466, 197, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (467, 197, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (468, 197, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (220, 197, 30);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2780, 197, 1, CONCAT('Higgins', CHAR(39), ' Silo'), '2018-09-26', 'https://ebd.cda.pl/800x450/305796012');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2781, 197, 2, CONCAT('Pygmalion'), '2018-09-27', 'https://ebd.cda.pl/800x450/315905986');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2782, 197, 3, CONCAT('Beatless'), '2018-09-28', 'https://ebd.cda.pl/800x450/315906548');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2783, 197, 4, CONCAT('Boy Meets Girl'), '2018-09-28', 'https://ebd.cda.pl/620x395/6045875a7');
