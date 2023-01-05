INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (756, CONCAT('High School DxD Specials'), CONCAT('A series of 3-5 minute specials that were bundled with the HighSchool DxD DVD and Blu-rays. They are a stand alone set of episodes that are not a part of any story line in particular.<br>
<br>Special 1: Going Sunbathing! - The Occult Research Club goes on a beach outing.<br>
<br>Special 2: Issei', CHAR(39), 's Private Training! - Issei is being given lessons in magic by Akeno.<br>
<br>Special 3: A Little Bold, Koneko-Chan... Nyan! - Koneko accidentally has her personality reversed magically, making her incredibly sexually active and reversing her sexual preference.<br>
<br>Special 4: The Untold Story of The Dress Break', CHAR(39), 's Birth! - A few flashbacks of how Issei first found out and eventually perfected his special move, Dress Break.<br>
<br>Special 5: Making Udon! - As part of a penalty for losing a bet, Sona and Tsubaki make udon for the Occult Research Club but the udon comes to life in a peculiar way...<br>
<br>Special 6: Asia Transforms! - Asia wants to prove she is just as bad as any demon by using ideas found in Issei', CHAR(39), 's magazines, going as far as dressing up like a harlot and seducing him.<br>
<br>(Source: Wikipedia)'), 1, '2012-03-21', '2012-08-29', '', '4 min. per ep.', 'https://cdn.myanimelist.net/images/anime/10/38449.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1856, 756, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1857, 756, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1858, 756, 3);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1859, 756, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (833, 756, 73);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (13589, 756, 1, CONCAT('Going Sunbathing!'), '2012-03-21', 'https://ebd.cda.pl/620x368/1016368c6');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (13590, 756, 2, CONCAT('Akeno', CHAR(39), 's Private Training!'), '2012-04-25', 'https://ebd.cda.pl/620x368/101639831');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (13591, 756, 3, CONCAT('Koneko, A Bit More Bold... Meow'), '2012-05-23', 'https://ebd.cda.pl/620x368/101967117');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (13592, 756, 4, CONCAT('The Untold Story of The Dress Break', CHAR(39), 's Birth!'), '2012-06-27', 'https://ebd.cda.pl/620x368/101997428');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (13593, 756, 5, CONCAT('Making Udon!'), '2012-07-25', 'https://ebd.cda.pl/620x368/10403350e');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (13594, 756, 6, CONCAT('Asia Transforms!'), '2012-08-29', 'https://ebd.cda.pl/620x368/1040494ad');
