INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (14, CONCAT('7 Seeds'), CONCAT('Imagine this: you are living a normal day in your life. Maybe you are out with friends, eating your family', CHAR(39), 's home-cooked meal or spending time with your girlfriend. When you next wake up, you are suddenly thrust into a strange, new world, surrounded by five strangers on a rapidly sinking boat in the middle of a storm.<br>
<br>For Natsu Iwashimizu, this is her new reality. Humanity has perished, and all that remains of the Japanese population are five groups of men and women who were chosen to be sent to the future in hopes of continuing mankind', CHAR(39), 's existence. While every other person chosen has a useful talent such as martial arts, knowledge, or architecture, Natsu is a shy high school girl who cannot even raise her voice to shout. The new world is dangerous beyond imagination, and although Natsu seems to lack helpful skills, she must go with the others making their way to the "Seven Fuji" in order to survive.<br>
<br>[Written by MAL Rewrite]'), 4, '2019-06-28', NULL, '', '25 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1219/116954.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (10, 14, '"Ark"', ' by Amatsuki', 'js-theme-songs', 'https://open.spotify.com/track/10FuSRFaG4k0ylerO6CZE5')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (9, 14, 3);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (32, 14, 2);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (33, 14, 6);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (34, 14, 4);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (35, 14, 7);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (36, 14, 3);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (14, 14, 5);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (15, 14, 11);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (16, 14, 4);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (17, 14, 14);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (18, 14, 15);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (164, 14, 5, CONCAT('Heavy Snow'), '2019-06-28', 'https://ebd.cda.pl/620x368/4321229aa');
