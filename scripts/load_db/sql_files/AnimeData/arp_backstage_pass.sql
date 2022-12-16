INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (129, CONCAT('ARP Backstage Pass'), CONCAT('ARP: A 4-member dance and vocal group created by the latest AR technology. This popular group got their start with Avex, and are unique for their interactive concerts which combine highly-skilled song and dance routines with a format that changes based on how much the fans are cheering them on.<br>
<br>(Source: Crunchyroll)'), 5, '2020-01-13', '2020-03-30', 'Winter 2020', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1559/110721.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (84, 129, '"Burn it up"', ' by ARP', 'js-theme-songs', 'https://open.spotify.com/track/5MArrkmNEt9CDc1Y34e9mi')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (145, 129, 67);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (126, 129, 36);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (127, 129, 6);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1866, 129, 1, CONCAT('The Show Must Go On'), NULL, 'https://ebd.cda.pl/620x368/55910763d');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1867, 129, 2, CONCAT('The World Is Mine'), NULL, 'https://ebd.cda.pl/620x368/5592042a2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1868, 129, 3, CONCAT('THE KISS'), NULL, 'https://ebd.cda.pl/620x368/56242622f');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1869, 129, 4, CONCAT('Logical Dreamer'), NULL, 'https://ebd.cda.pl/620x368/564339215');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1870, 129, 5, CONCAT('D.O.A'), NULL, 'https://ebd.cda.pl/620x368/564750513');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1871, 129, 6, CONCAT('Tender Blue'), NULL, 'https://ebd.cda.pl/620x368/569787863');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1872, 129, 7, CONCAT('Fantasista'), NULL, 'https://ebd.cda.pl/620x368/571506844');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1873, 129, 8, CONCAT('rrRrride On!'), NULL, 'https://ebd.cda.pl/620x368/572588369');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1874, 129, 9, CONCAT('Read Your Mind'), NULL, 'https://ebd.cda.pl/620x368/57389664f');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1875, 129, 10, CONCAT('A', CHAR(39), 'LIVE'), NULL, 'https://ebd.cda.pl/620x368/573896327');
