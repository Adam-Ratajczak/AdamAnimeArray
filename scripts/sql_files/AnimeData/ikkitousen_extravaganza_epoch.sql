INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (838, CONCAT('Ikkitousen: Extravaganza Epoch'), CONCAT('New Ikkitousen OVA.'), 1, '2014-12-21', '2014-12-28', '', '25 min. per ep.', 'https://cdn.myanimelist.net/images/anime/2/70993.jpg');
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (919, 838, 31);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (936, 838, 24);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (937, 838, 13);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (938, 838, 29);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14968, 838, 1, CONCAT('Encounter'), '2014-12-21', 'https://www.mp4upload.com/embed-jpf2wrdihywa.html');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (14969, 838, 2, CONCAT('Exchange'), '2014-12-28', 'https://www.mp4upload.com/embed-a0pu5vuusy02.html');
