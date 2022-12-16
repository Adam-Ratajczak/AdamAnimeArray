INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (126, CONCAT('Arifureta Shokugyou de Sekai Saikyou'), CONCAT('The ordinary life of 17-year-old otaku Hajime Nagumo is disrupted when he and his classmates are summoned to a fantasy world and tasked with saving mankind. While his classmates are gifted with impressive abilities useful in combat, Hajime is belittled for only gaining an inferior transmutation skill that lacks any real offensive power. <br>
<br>During an expedition in the Great Orcus Labyrinth, Hajime is betrayed by one of his classmates, plummeting him to the bottom of an abyss. Though he survives the fall, Hajime is faced with menacing monsters and misfortunes that send him spiraling into a grim nightmare. Desperate to live and return home one day, he resolves to fight for his survival—only to meet an imprisoned vampire he names Yue, who is also seeking to escape the labyrinth. Taking an interest in him, Yue and a few others along the way accompany Hajime on his journey to find a way back home, while steadily transforming from commonplace to the world', CHAR(39), 's strongest. <br>
<br>[Written by MAL Rewrite]'), 1, '2019-07-08', '2019-10-07', 'Summer 2019', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1776/97682.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (83, 126, '"FLARE"', ' by Void_Chords feat.LIO', 'js-theme-songs', 'https://open.spotify.com/track/18dWBsEdWdGA1MRPN95H1X')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (291, 126, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (292, 126, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (293, 126, 9);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (140, 126, 34);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (141, 126, 38);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (122, 126, 12);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (123, 126, 20);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1849, 126, 1, CONCAT('The Monster of the Abyss'), '2019-07-08', 'https://drive.google.com/file/d/1njOyUY37zzNQaJtTZ5vOPff2dn-6Lzj9/preview');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1850, 126, 2, CONCAT('Pandora', CHAR(39), 's Box'), '2019-07-15', 'https://ebd.cda.pl/800x450/3688572cf');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1851, 126, 3, CONCAT('The Golden Vampire Princess'), '2019-07-22', 'https://ebd.cda.pl/800x450/371530937');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1852, 126, 4, CONCAT('Guardian of the Depths'), '2019-07-29', 'https://ebd.cda.pl/620x368/373751200');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1853, 126, 5, CONCAT('The Maverick', CHAR(39), 's Lair'), '2019-08-05', 'https://ebd.cda.pl/800x450/54258692e');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1854, 126, 6, CONCAT('Worthless Rabbit'), '2019-08-19', 'https://ebd.cda.pl/800x450/3810121de');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1855, 126, 7, CONCAT('Great Reisen Labyrinth'), '2019-08-26', 'https://ebd.cda.pl/800x450/54258783e');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1856, 126, 8, CONCAT('Reunion with the Past'), '2019-09-02', 'https://ebd.cda.pl/800x450/5425881d1');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1857, 126, 9, CONCAT('Dragon Slayer'), '2019-09-09', 'https://ebd.cda.pl/800x450/392932986');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1858, 126, 10, CONCAT('The Goddess', CHAR(39), ' Sword'), '2019-09-16', 'https://ebd.cda.pl/800x450/542588757');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1859, 126, 11, CONCAT('The Monsters', CHAR(39), ' Day Off'), '2019-09-23', 'https://ebd.cda.pl/800x450/398689335');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1860, 126, 12, CONCAT('A Looming Shadow'), '2019-09-30', 'https://ebd.cda.pl/800x450/401313423');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1861, 126, 13, CONCAT('The Best at Being the Worst'), '2019-10-07', 'https://ebd.cda.pl/800x450/40154595a');
