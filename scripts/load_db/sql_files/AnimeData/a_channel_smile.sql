INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (20, CONCAT('A-Channel+smile'), CONCAT('Following the everyday lives of four high school girls: the flighty Run, the reckless Tooru, the timid Yuuko, and the level-headed Nagi.<br>
<br>Mountain of Pancakes
<br>Kitou-sensei injures her hand during class and has to deal with it while Tooru brings cat Tansan to school with her to meet Yutaka and Miho. Later, the girls decide to get pancakes at a café where Miho happens to be working, facing trouble when Yutaka shows up out of the blue.<br>
<br>A Picture of a Wish
<br>Yuuko catches a cold so the others pay her a visit and help look after her. Later, the girls get together for the New Year', CHAR(39), 's shrine visit.<br>
<br>(Source: Wikipedia)'), 1, '2012-03-21', NULL, '', '25 min. per ep.', 'https://cdn.myanimelist.net/images/anime/12/35321.jpg');
INSERT INTO AnimeDemographics(BindingID, AnimeID, GroupID) VALUES (12, 20, 2);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (22, 20, 16);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (26, 20, 8);
INSERT INTO AnimeThemes(BindingID, AnimeID, ThemeID) VALUES (27, 20, 13);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (218, 20, 1, CONCAT('Yamamori Pancake: An Accident'), '2012-02-11', 'https://vk.com/video250055088_168462737');
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (219, 20, 2, CONCAT('A Picture of a Wish: A Happy New Year'), '2012-03-21', 'https://vk.com/video250055088_168462738');
