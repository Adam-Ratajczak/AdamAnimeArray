INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (1867, CONCAT('Teekyuu 2 Specials'), CONCAT('Short specials included in the Blu-ray release.'), 1, '2013-10-25', NULL, '', '2 min. per ep.', 'https://cdn.myanimelist.net/images/anime/12/56005.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (1329, 1867, '"Menimeni Manimani (メニメニマニマニ)"', ' by Nasuno Takamiya (CV: Kyoko Narumi)', 'js-theme-songs', 'https://open.spotify.com/track/7EvzUhU6zpdJxAsjNQZ1gN');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (775, 1867, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4627, 1867, 12);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (4628, 1867, 19);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (2022, 1867, 73);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (33397, 1867, 1, CONCAT('Charlie and the Chocolate Factory with Senpai'), '2013-10-25', 'https://mp4upload.com/embed-akfhzgj0htk5.html');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (33398, 1867, 2, CONCAT('Spirited Away with Senpai'), '2013-10-25', 'https://mp4upload.com/embed-h66cs9udrkz4.html');
