-- Drop all tables
DROP TABLE IF EXISTS AnimeDemographics;
DROP TABLE IF EXISTS AnimeProducers;
DROP TABLE IF EXISTS AnimeGenres;
DROP TABLE IF EXISTS AnimeRelations;
DROP TABLE IF EXISTS AnimeThemes;
DROP TABLE IF EXISTS Episodes;
DROP TABLE IF EXISTS Songs;
DROP TABLE IF EXISTS Animes;
DROP TABLE IF EXISTS Demographics;
DROP TABLE IF EXISTS Genres;
DROP TABLE IF EXISTS Producers;
DROP TABLE IF EXISTS Themes;
DROP TABLE IF EXISTS Types;

-- Types of anime in the database
CREATE TABLE IF NOT EXISTS Types(
    TypeID int PRIMARY KEY,
    TypeName VARCHAR(64) NOT NULL
);

-- Table for storing basic Anime records
CREATE TABLE IF NOT EXISTS Animes(
    AnimeID int PRIMARY KEY,
    AnimeTitle VARCHAR(64) NOT NULL,
    AnimeDesc TEXT,
    TypeID int NOT NULL,
    AiredBegin DATE,
    AiredEnd DATE,
    Premiered VARCHAR(64),
    Duration VARCHAR(64),
    PosterUrl VARCHAR(256),
    FOREIGN KEY (TypeID) REFERENCES Types(TypeID)
);

-- Types of anime genres in the database
CREATE TABLE IF NOT EXISTS Genres(
    GenreID int PRIMARY KEY,
    GenreName VARCHAR(64) NOT NULL
);

-- Anime => genre binding
CREATE TABLE IF NOT EXISTS AnimeGenres(
    BindingID int PRIMARY KEY,
    AnimeID int NOT NULL,
    GenreID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (GenreID) REFERENCES Genres(GenreID)
);

-- Types of anime themes in the database
CREATE TABLE IF NOT EXISTS Themes(
    ThemeID int PRIMARY KEY,
    ThemeName VARCHAR(64) NOT NULL
);

-- Anime => theme binding
CREATE TABLE IF NOT EXISTS AnimeThemes(
    BindingID int PRIMARY KEY,
    AnimeID int NOT NULL,
    ThemeID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (ThemeID) REFERENCES Themes(ThemeID)
);

-- List of anime producers in the database
CREATE TABLE IF NOT EXISTS Producers(
    ProducerID int PRIMARY KEY,
    ProducerName VARCHAR(64) NOT NULL
);

-- Anime => producer binding
CREATE TABLE IF NOT EXISTS AnimeProducers(
    BindingID int PRIMARY KEY,
    AnimeID int NOT NULL,
    ProducerID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (ProducerID) REFERENCES Producers(ProducerID)
);

-- List of anime demographic groups
CREATE TABLE IF NOT EXISTS Demographics(
    GroupID int PRIMARY KEY,
    GroupName VARCHAR(64) NOT NULL
);

-- Anime => group binding
CREATE TABLE IF NOT EXISTS AnimeDemographics(
    BindingID int PRIMARY KEY,
    AnimeID int NOT NULL,
    GroupID int NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (GroupID) REFERENCES Demographics(GroupID)
);

-- Bound of two anime seasons cnnected in some way
CREATE TABLE IF NOT EXISTS AnimeRelations(
    RelationID int PRIMARY KEY,
    AnimeID int NOT NULL,
    OtherID int NOT NULL,
    RelationType VARCHAR(64) NOT NULL,
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID),
    FOREIGN KEY (OtherID) REFERENCES Animes(AnimeID)
);

-- Table for storing basic anime songs
CREATE TABLE IF NOT EXISTS Songs(
    SongID int PRIMARY KEY,
    AnimeID int NOT NULL,
    Title VARCHAR(64) NOT NULL,
    Artist VARCHAR(64) NOT NULL,
    SpotifyUrl VARCHAR(256),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

-- Table for storing basic anime episodes records
CREATE TABLE IF NOT EXISTS Episodes(
    EpisodeID int PRIMARY KEY,
    AnimeID int NOT NULL,
    EpisodeNr int NOT NULL,
    Title VARCHAR(256) NOT NULL,
    Aired DATE,
    PlayerUrl VARCHAR(256),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);
