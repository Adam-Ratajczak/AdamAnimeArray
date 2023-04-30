
-- Types of anime in the database
CREATE TABLE IF NOT EXISTS Types(
    TypeID int PRIMARY KEY AUTO_INCREMENT,
    TypeName VARCHAR(64) NOT NULL
);

-- Table for storing basic Anime records
CREATE TABLE IF NOT EXISTS Animes(
    AnimeID int PRIMARY KEY AUTO_INCREMENT,
    AnimeTitle VARCHAR(64) NOT NULL,
    EnglishTitle VARCHAR(64) NOT NULL,
    AnimeDesc TEXT,
    TypeID int NOT NULL,
    AiredBegin DATE,
    AiredEnd DATE,
    Premiered VARCHAR(64),
    Duration VARCHAR(64),
    PosterUrl VARCHAR(256),
    MalUrl VARCHAR(256),
    MalRank INT,
    FOREIGN KEY (TypeID) REFERENCES Types(TypeID)
);

-- Types of anime genres in the database
CREATE TABLE IF NOT EXISTS Genres(
    GenreID int PRIMARY KEY AUTO_INCREMENT,
    GenreName VARCHAR(64) NOT NULL
);

-- Anime => genre binding
CREATE TABLE IF NOT EXISTS AnimeGenres(
    BindingID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    GenreID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

-- Types of anime themes in the database
CREATE TABLE IF NOT EXISTS Themes(
    ThemeID int PRIMARY KEY AUTO_INCREMENT,
    ThemeName VARCHAR(64) NOT NULL
);

-- Anime => theme binding
CREATE TABLE IF NOT EXISTS AnimeThemes(
    BindingID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    ThemeID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (ThemeID) REFERENCES Themes(ThemeID)
);

-- List of anime producers in the database
CREATE TABLE IF NOT EXISTS Producers(
    ProducerID int PRIMARY KEY AUTO_INCREMENT,
    ProducerName VARCHAR(64) NOT NULL
);

-- Anime => producer binding
CREATE TABLE IF NOT EXISTS AnimeProducers(
    BindingID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    ProducerID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (ProducerID) REFERENCES Producers(ProducerID)
);

-- List of anime producers in the database
CREATE TABLE IF NOT EXISTS Studios(
    StudioID int PRIMARY KEY AUTO_INCREMENT,
    StudioName VARCHAR(64) NOT NULL
);

-- Anime => producer binding
CREATE TABLE IF NOT EXISTS AnimeStudios(
    BindingID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    StudioID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (StudioID) REFERENCES Studios(StudioID)
);

-- List of anime demographic groups
CREATE TABLE IF NOT EXISTS Demographics(
    DemographicID int PRIMARY KEY AUTO_INCREMENT,
    DemographicName VARCHAR(64) NOT NULL
);

-- Anime => group binding
CREATE TABLE IF NOT EXISTS AnimeDemographics(
    BindingID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    DemographicID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (DemographicID) REFERENCES Demographics(DemographicID)
);

-- Store connection types
CREATE TABLE IF NOT EXISTS Relations(
    RelationID int PRIMARY KEY AUTO_INCREMENT,
    RelationType VARCHAR(64) NOT NULL
);

-- Bound of two anime seasons cnnected in some way
CREATE TABLE IF NOT EXISTS AnimeRelations(
    BindingID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    OtherID int NOT NULL,
    RelationID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (OtherID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (RelationID) REFERENCES Relations(RelationID)
);

-- Table for storing basic anime songs
CREATE TABLE IF NOT EXISTS Songs(
    SongID int PRIMARY KEY AUTO_INCREMENT,
    Title VARCHAR(64) NOT NULL,
    Artist VARCHAR(64) NOT NULL,
    SongType VARCHAR(32) NOT NULL
);

-- Table for storing basic song player links
CREATE TABLE IF NOT EXISTS SongPlayers(
    PlayerID int PRIMARY KEY AUTO_INCREMENT,
    SongID int NOT NULL,
    Source VARCHAR(64),
    PlayerUrl VARCHAR(256),
    FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

-- Table for storing basic anime episodes records
CREATE TABLE IF NOT EXISTS Episodes(
    EpisodeID int PRIMARY KEY AUTO_INCREMENT,
    AnimeID int NOT NULL,
    EpisodeNr int NOT NULL,
    Title VARCHAR(256) NOT NULL,
    Aired DATE,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

-- Table for storing anime episode player info
CREATE TABLE IF NOT EXISTS EpisodePlayers(
    PlayerID int PRIMARY KEY AUTO_INCREMENT,
    EpisodeID int NOT NULL,
    LangCode CHAR(2) NOT NULL,
    Source VARCHAR(64),
    Quality VARCHAR(16),
    PlayerUrl VARCHAR(256),
    FOREIGN KEY (EpisodeID) REFERENCES Episodes(EpisodeID),
    FOREIGN KEY (LangCode) REFERENCES Languages(LangCode)
);

-- Table for storing anime openings and endings
CREATE TABLE IF NOT EXISTS EpisodeSongs(
    EntryID int PRIMARY KEY AUTO_INCREMENT,
    EpisodeID int NOT NULL,
    SongID int NOT NULL,
    FOREIGN KEY (EpisodeID) REFERENCES Episodes(EpisodeID),
    FOREIGN KEY (SongID) REFERENCES Songs(SongID)
);

-- Table for storing episode language info
CREATE TABLE IF NOT EXISTS Languages(
    LangCode CHAR(2) PRIMARY KEY,
    LanguageName VARCHAR(64),
    LanguageFlag VARCHAR(256)
);

INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('pl', 'Polish', 'pl_flag.png');
INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('en', 'English', 'us_flag.png');
INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('gb', 'British English', 'gb_flag.png');
INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('de', 'German', 'ger_flag.png');
INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('fr', 'French', 'fr_flag.png');
INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('it', 'Italian', 'it_flag.png');
INSERT INTO Languages(LangCode, LanguageName, LanguageFlag) VALUES ('jp', 'Japanese', 'jp_flag.png');
