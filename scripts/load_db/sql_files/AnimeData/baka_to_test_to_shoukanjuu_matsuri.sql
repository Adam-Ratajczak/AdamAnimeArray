INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (157, CONCAT('Baka to Test to Shoukanjuu: Matsuri'), CONCAT('OVA of Baka to Test to Shoukanjuu which was announced to be released before the start of the second series.'), 1, '2011-02-23', '2011-03-30', '', '29 min. per ep.', 'https://cdn.myanimelist.net/images/anime/3/67303.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (104, 157, '"Renai Koujou committee (恋愛向上committee)"', ' by Natsuko Asou', 'js-theme-songs', 'https://open.spotify.com/track/6YQBNplNFcFLHnP9nRsR3p');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (356, 157, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (357, 157, 7);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (179, 157, 50);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (165, 157, 22);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (166, 157, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2202, 157, 1, CONCAT('Day 1 - Me, Maids, and a New Start'), NULL, 'https://drive.google.com/file/d/0B5-R53biofSuRXhmaEw0LUVpdkE/preview');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2203, 157, 2, CONCAT('Day 2 - Idiots, Fireworks and the Summoner Tournament'), NULL, 'https://drive.google.com/file/d/0B5-R53biofSuNHBGdmNSbEd0MUk/preview');
