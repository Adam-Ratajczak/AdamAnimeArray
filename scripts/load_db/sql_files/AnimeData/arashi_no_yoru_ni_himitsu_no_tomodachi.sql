INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (117, CONCAT('Arashi no Yoru ni: Himitsu no Tomodachi'), CONCAT('A new anime adaptation by Sparky Animation, Duckbill Entertainment, Baku Enterprise and Bandai Visual of the book Arashi no Yoru ni (One Stormy Night...) by Kimura Yuuichi.'), 1, '2012-04-04', '2012-09-26', 'Spring 2012', '23 min. per ep.', 'https://cdn.myanimelist.net/images/anime/4/36603.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (73, 117, '"Dear My Friend"', ' by U-KISS', 'js-theme-songs', 'https://open.spotify.com/track/7hd1gMsY6EcPYHfJWgCBG6');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (267, 117, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (268, 117, 9);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (269, 117, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (131, 117, 4);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (1697, 117, 1, CONCAT('Stormy Night'), '2012-04-04', 'https://www.mp4upload.com/embed-erdm468r4yqr.html');
