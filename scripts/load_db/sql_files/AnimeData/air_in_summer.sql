INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (55, CONCAT('Air in Summer'), CONCAT('Unwilling to move to a different shrine and leave her friends behind, Kanna escapes in the dead of night with her loyal bodyguard Ryuuya and confidant Uraha. Knowing their pursuers are not far behind, the three embark on a journey to locate Kanna', CHAR(39), 's mother, who Kanna yearns to see after many years of separation. Amid the tensions, the trio explores the world outside the confines of the palace—serving as a tranquil yet temporary distraction from what is to come.<br>
<br>[Written by MAL Rewrite]'), 1, '2005-08-28', '2005-09-04', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/2/82726.jpg');
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (62, 55, 14);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (63, 55, 15);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (859, 55, 1, CONCAT('Mountain Path'), '2005-08-28', 'https://ebd.cda.pl/620x368/1980093aa');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (860, 55, 2, CONCAT('Universe'), '2005-09-04', 'https://ebd.cda.pl/620x368/198009637');
