INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (10, CONCAT('3D Kanojo: Real Girl 2nd Season'), CONCAT('Second season of 3D Kanojo: Real Girl.'), 1, '2019-01-09', '2019-03-27', 'Winter 2019', '22 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1237/113435.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (8, 10, '"Futari nara (二人なら)"', ' by BiSH', 'js-theme-songs', '')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (7, 10, 3);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (18, 10, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (19, 10, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (20, 10, 8);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (10, 10, 2);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (133, 10, 1, CONCAT('Regarding the Time We Put One Foot in the Normie World.'), '2019-01-09', 'https://ebd.cda.pl/620x368/29571664e');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (134, 10, 2, CONCAT('Regarding the Time We Had Important Roles in the School Festival'), '2019-01-16', 'https://ebd.cda.pl/620x368/29811000a');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (135, 10, 3, CONCAT('Regarding My Unforeseen Family Crisis.'), '2019-01-23', 'https://ebd.cda.pl/620x368/3023382b1');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (136, 10, 4, CONCAT('Regarding the Untold Story of My Parents', CHAR(39), ' Courtship.'), '2019-01-30', 'https://ebd.cda.pl/620x368/3049041df');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (137, 10, 5, CONCAT('Regarding Miss Ayado', CHAR(39), 's New Mental Anguish.'), '2019-02-06', 'https://ebd.cda.pl/620x368/308252718');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (138, 10, 6, CONCAT('Regarding the Courtship of My Female Friend Ishino.'), '2019-02-13', 'https://ebd.cda.pl/620x368/31114566a');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (139, 10, 7, CONCAT('Regarding the Troubling Invitation from My Girlfriend.'), '2019-02-20', 'https://ebd.cda.pl/620x368/3141713e8');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (140, 10, 8, CONCAT('Regarding When My Friend and My Maybe Friend Became Official.'), '2019-02-27', 'https://ebd.cda.pl/620x368/31705709f');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (141, 10, 9, CONCAT('Regarding My Choice to Have No Regrets in My High School Life'), '2019-03-06', 'https://ebd.cda.pl/620x368/319835036');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (142, 10, 10, CONCAT('Regarding My Thoughts on the Sacred Mysteries of Life.'), '2019-03-13', 'https://ebd.cda.pl/620x368/322203513');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (143, 10, 11, CONCAT('Regarding My Last Promise to Her.'), '2019-03-20', 'https://ebd.cda.pl/620x368/3250036d9');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (144, 10, 12, CONCAT('Regarding Her Future and Mine.'), '2019-03-27', 'https://ebd.cda.pl/620x368/32791334c');
