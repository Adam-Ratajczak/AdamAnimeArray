INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (500, CONCAT('eX-Driver'), CONCAT('Ex-Driver is set in the future, when all transportation is easily controlled by AI. Though like all machines they tend to break down or lose control or re-programmed. This is where three high schoolers with non AI cars, Subaru WRX, Super 7, Lotus comes in to save the day and make sure the public is safe at all times. <br>
<br>(Source: ANN)'), 1, '2000-07-25', '2001-09-25', '', '25 min. per ep.', 'https://cdn.myanimelist.net/images/anime/8/26197.jpg');
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1233, 500, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (1234, 500, 7);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (556, 500, 77);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (8943, 500, 1, CONCAT('AI vs RECIPRO'), '2000-07-25', 'https://vk.com/video_ext.php?oid=157826213&id=163258756&hash=a57858d1634cbe18');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (8944, 500, 2, CONCAT('On And On'), '2000-10-25', 'https://vk.com/video_ext.php?oid=157826213&id=163258757&hash=42798791cbd202d2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (8945, 500, 3, CONCAT('No Problem'), '2001-01-25', 'https://ebd.cda.pl/800x450/90322238c');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (8946, 500, 4, CONCAT('Regulations of Love'), '2001-06-25', 'https://vk.com/video_ext.php?oid=157826213&id=163259995&hash=476692bd8d230407&hd=2');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (8947, 500, 5, CONCAT('Crossroads'), '2001-08-25', 'https://ebd.cda.pl/800x450/9053385b8');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (8948, 500, 6, CONCAT('The Last Mile'), '2001-09-25', 'https://ebd.cda.pl/800x450/9055383bf');
