INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (104, CONCAT('Ao no Exorcist: Kyoto Fujouou-hen OVA'), CONCAT('Bundled with the 19th and 20th volumes of the Ao no Exorcist manga.<br>
<br>The first episode is based on the second chapter of the second Ao no Exorcist novel Home Sweet Home.<br>
<br>The second episode is based on the title chapter from the Ao no Exorcist: Spy Game novel.'), 1, '2017-04-04', '2017-10-04', '', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1031/96313.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (50, 104, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (237, 104, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (238, 104, 9);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (118, 104, 6);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (106, 104, 11);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (107, 104, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1551, 104, 1, CONCAT('Snake and Poison'), '2017-04-04', 'https://ebd.cda.pl/800x450/2977665cd');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1552, 104, 2, CONCAT('Spy Game'), '2017-10-04', 'https://ebd.cda.pl/800x450/2977668f8');
