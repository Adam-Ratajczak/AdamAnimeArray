INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (21, CONCAT('Aa! Megami-sama!'), CONCAT('When college student Keiichi Morisato dials the wrong number while ordering for some food at his dormitory, he accidentally gets connected to the Goddess Hotline and a beautiful goddess named Belldandy appears out of a mirror in front of him. After getting kicked out of the dorm, Keiichi and Belldandy move to an old shrine and soon afterwards, Belldandy', CHAR(39), 's sisters Urd and Skuld move in. '), 1, '1993-02-21', '1994-05-17', '', '30 min. per ep.', 'https://cdn.myanimelist.net/images/anime/11/71215.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (13, 21, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (40, 21, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (41, 21, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (42, 21, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (23, 21, 17);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (28, 21, 12);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (29, 21, 18);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (220, 21, 1, CONCAT('Moonlight and Cherry Blossoms'), '1993-02-21', 'https://myvi.ru/player/embed/html/oju8Hfdz2-PPvZD8w_Z9IzuUZ5C1PD6dQTfhOd4m7WaGPXxAPn0oh_pvIhGQMl8VY0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (221, 21, 2, CONCAT('Midsummer Night', CHAR(39), 's Dream'), '1993-05-21', 'https://myvi.ru/player/embed/html/oUl_OfmzgzoYQ-PxE6nybT1jSUd_iUN6a8cjoVRrbPwUk_qpt6Wi8ZPLM2GV1yZ100');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (222, 21, 3, CONCAT('Burning Hearts on the Road'), '1993-09-21', 'https://myvi.ru/player/embed/html/o4SyRtViloS2kXIchgo94r_7Pn8QfRnMF_ptPaW1EEeHdDVLmOM5yAeXb2uxRXtdS0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (223, 21, 4, CONCAT('Evergreen Holy Night'), '1993-12-28', 'https://myvi.ru/player/embed/html/oS_4zjqMphx8_Z-WNrOumCx1p5hwmFZxhL6l-KS-K3BGTnI68MckN-wwEwOG0AjW70');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (224, 21, 5, CONCAT('For the Love of Goddess'), '1994-05-17', 'https://myvi.ru/player/embed/html/of2gZMjsugXJDqUDqYqIY0VTzkfhLb9JjwtyCB0upgZC_zPBtBWs69x7iR6lJf2Uz0');
