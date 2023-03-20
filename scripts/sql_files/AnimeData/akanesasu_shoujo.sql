INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (60, CONCAT('Akanesasu Shoujo'), CONCAT('The urban legend of the 4:44 ritual consists of using a radio player to produce frequencies in front of the Akeyuki Sacred Tree at exactly 4:44, transporting people to a different dimension.<br>
<br>When Asuka Tsuchimiya and her friends—Nana Nanase, Mia Silverstone, Yuu Tounaka, and Chloe Morisu—decide to perform this ritual as an activity of the Crystal Radio Research Club, they are shocked when the ritual works. The five travel to a parallel world, known as a fragment, where they meet an unsettlingly familiar girl—Asuka', CHAR(39), 's parallel-world self. This Asuka is dubbed as Seriouska due to her serious attitude and capability to fight.<br>
<br>Seriouska tells them about the great danger that faces all the parallel worlds, the Twilight. As it strips the parallel worlds of all of its possibilities, Seriouska seeks the death of the man behind the Twilight, the Twilight King, to stop his onslaught over the multiverse.<br><br>Akanesasu Shoujo follows the five girls as they learn to accept their true selves, all the while searching for the Twilight King. However, the solution to the invasive Twilight might be closer than they think.<br>
<br>[Written by MAL Rewrite]<br>'), 1, '2018-10-01', '2018-12-17', 'Fall 2018', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1210/95781.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (141, 60, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (142, 60, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (69, 60, 39);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (70, 60, 40);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (71, 60, 41);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (950, 60, 1, CONCAT('Ritual at 4:44'), '2018-10-01', 'https://ebd.cda.pl/620x395/659673540');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (951, 60, 2, CONCAT('Another Fragment'), '2018-10-08', 'https://ebd.cda.pl/620x395/65967237f');