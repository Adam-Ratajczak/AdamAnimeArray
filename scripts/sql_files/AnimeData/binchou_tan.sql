INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (212, CONCAT('Binchou-tan'), CONCAT('This is a story about a little girl who lives in an old house in the mountains. Her name is Bincho-tan. Each episode depicts a day in the life of Bincho-tan as she prepares her breakfast in the morning, goes to the forest to gather vegetables, does her household chores and rests at night after a day', CHAR(39), 's work. She is surrounded by a group of close friends who add color to her ordinary yet simple life. '), 1, '2006-02-03', '2006-04-16', 'Winter 2006', '12 min. per ep.', 'https://cdn.myanimelist.net/images/anime/10/61143.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (99, 212, 3);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (505, 212, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (506, 212, 8);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (507, 212, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (237, 212, 35);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (217, 212, 8);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (218, 212, 11);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2981, 212, 1, CONCAT('Spring Awakening'), '2006-02-03', 'https://ebd.cda.pl/620x395/522129955');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2982, 212, 2, CONCAT('Gets a Job'), '2006-02-10', 'https://ebd.cda.pl/620x395/522129375');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2983, 212, 3, CONCAT('Bin', CHAR(39), 's Birthday'), '2006-02-17', 'https://ebd.cda.pl/620x395/5221287c0');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2984, 212, 4, CONCAT('Rainy Sunday'), '2006-02-24', 'https://ebd.cda.pl/620x395/52212847d');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2985, 212, 5, CONCAT('Memories of Kimono'), '2006-03-03', 'https://ebd.cda.pl/620x395/5221290e9');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2986, 212, 6, CONCAT('Work in the Night'), '2006-03-10', 'https://ebd.cda.pl/620x395/522129674');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2987, 212, 7, CONCAT('Ramune and Candy Apples'), '2006-03-16', 'https://ebd.cda.pl/620x395/5221302f7');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2988, 212, 8, CONCAT('Close Your Hands, Open Your Hands'), '2006-03-23', 'https://ebd.cda.pl/620x395/5221305bd');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2989, 212, 9, CONCAT('A Stag Beetle is Following'), '2006-03-30', 'https://ebd.cda.pl/620x395/5221314af');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2990, 212, 10, CONCAT('The Baked Sweet Potatoes Season'), '2006-04-09', 'https://ebd.cda.pl/620x395/5221311e5');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2991, 212, 11, CONCAT('First snow, First sledge, First flight'), '2006-04-16', 'https://ebd.cda.pl/620x395/5221308ae');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2992, 212, 12, CONCAT('A Letter to the Sky'), '2006-04-16', 'https://ebd.cda.pl/620x395/5221317d0');
