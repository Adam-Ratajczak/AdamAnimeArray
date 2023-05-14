-- user watchlist
CREATE TABLE IF NOT EXISTS UserSavedAnimes(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AnimeID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

-- user watched anime eps entry
CREATE TABLE IF NOT EXISTS UserAnimeProgress(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    EpisodeID INT NOT NULL,
    Progress INT,
    Seen DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (EpisodeID) REFERENCES Episodes(EpisodeID)
);

-- user searchbar history
CREATE TABLE IF NOT EXISTS UserSearchHistory(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AnimeID INT NOT NULL,
    Seen DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);
