INSERT INTO Animes(AnimeID, AnimeTitle, AnimeDesc, TypeID, AiredBegin, AiredEnd, Premiered, Duration, PosterUrl) VALUES (201, CONCAT('Bem'), CONCAT('Young detective Sonia Summers has been transferred to the outskirts of the port city Libra after stirring up trouble with her superiors. Libra is separated into two sectors—"the Upper," the center of wealth and politics, and "the Outside." The Outside is home to crime, corruption, and curious incidents involving monstrosities or youkai. Each case that Sonia works on seems to implicate the involvement of these mysterious creatures.<br>
<br>Sonia crosses paths with three peculiar humanoid youkai—Bem, Bela and Belo—who seek to protect humans and fight against the evil youkai that terrorize them. Living as "Youkai-Ningen," they are excluded by other youkai for their human-like lifestyles, and rejected and hurt by humans when they reveal their true forms.<br>
<br>Despite the hardships they face, these three Youkai-Ningen secretly live among humans, continuing to pursue their dreams of one day becoming human as well.<br>
<br>[Written by MAL Rewrite]'), 1, '2019-07-15', '2019-10-14', 'Summer 2019', '24 min. per ep.', 'https://cdn.myanimelist.net/images/anime/1127/99941.jpg');
INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl) VALUES (144, 201, '"Uchuu no Kioku (宇宙の記憶)"', ' by Maaya Sakamoto', 'js-theme-songs', 'https://open.spotify.com/track/3uaZprGpodif2hd4GPEZGA')INSERT INTO Songs(SongID, AnimeID, Title, Artist, Type, SpotifyUrl);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (478, 201, 1);
INSERT INTO AnimeGenres(BindingID, AnimeID, GenreID) VALUES (479, 201, 10);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (224, 201, 2);
INSERT INTO AnimeProducers(BindingID, AnimeID, ProducerID) VALUES (225, 201, 80);
INSERT INTO Episodes(EpisodeID, AnimeID, EpisodeNr, Title, Aired, PlayerUrl) VALUES (2882, 201, 1, CONCAT('Water'), '2019-07-15', 'https://ebd.cda.pl/620x368/3682639cd');
