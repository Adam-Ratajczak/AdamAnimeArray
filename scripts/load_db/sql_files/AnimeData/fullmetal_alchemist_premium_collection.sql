INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (542, CONCAT('Fullmetal Alchemist: Premium Collection'), CONCAT('1. State Alchemists vs Seven Homunculi
<br>A 10 minute film featuring: Ed, Al, Mustang and many other members of the State doing battle with the deadly Homonculi in an alternate reality Amestris.<br>
<br>2. Chibi Party (Enkai-hen)
<br>Short 6 minute Skit drawn in Super Deformed style where every character in the series (including bad guys) are celebrating an "After Party" of the Conqueror of Shambala movie.<br>
<br>3. Kids (Kodomo-hen)
<br>Short 3 minute story which features Edward and his grandkids in present day 2005.<br>
<br>(Source: ANN) '), 5, '2006-03-29', NULL, '', '7 min. per ep.', 'https://cdn.myanimelist.net/images/anime/10/18689.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (241, 542, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1346, 542, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1347, 542, 9);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (605, 542, 77);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (9977, 542, 1, CONCAT('State Alchemists Vs. Seven Homunculi'), '2006-03-29', 'https://www.youtube.com/embed/xTDuy5fsYlg');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (9978, 542, 2, CONCAT('Chibi Party'), '2006-03-29', 'https://www.youtube.com/embed/Yu3FPmpYzA8');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (9979, 542, 3, CONCAT('Kids'), '2006-03-29', 'https://player.vimeo.com/video/125042328');
