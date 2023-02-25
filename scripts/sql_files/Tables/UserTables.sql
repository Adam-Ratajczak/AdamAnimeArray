DROP TABLE IF EXISTS  UserAuth;
DROP TABLE IF EXISTS  UserPrivileges;
DROP TABLE IF EXISTS  UserSavedAnimes;
DROP TABLE IF EXISTS  UserDokiThemes;
DROP TABLE IF EXISTS  UserThemes;
DROP TABLE IF EXISTS  ChatEntry;
DROP TABLE IF EXISTS  PrivilegeTypes;
DROP TABLE IF EXISTS  DokiThemes;
DROP TABLE IF EXISTS  Users;

CREATE TABLE IF NOT EXISTS PrivilegeTypes(
    PrivilegeID INT PRIMARY KEY,
    PrivilegeName VARCHAR(64)
);

INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (1, 'USER');
INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (2, 'MODERATE_CHAT');
INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (3, 'MUTE_USERS');
INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (4, 'BAN_USERS');
INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (5, 'MODIFY_ANIME');
INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (6, 'MODIFY_THEMES');
INSERT INTO PrivilegeTypes(PrivilegeID, PrivilegeName) VALUES (7, 'ADMIN');

CREATE TABLE IF NOT EXISTS DokiThemes(
    ThemeID INT PRIMARY KEY AUTO_INCREMENT,
    ThemeName VARCHAR(255) NOT NULL,
    ThemeBaseColor CHAR(9),
    ThemeBgColor CHAR(9),
    ThemeBgColorDark CHAR(9),
    ThemeBgColorTheme CHAR(9),
    ThemeBgTiltedColor CHAR(9),
    ThemeBtnHoverColor CHAR(9),
    ThemeBtnHoverTextColor CHAR(9),
    ThemeFgColor CHAR(9),
    ThemeTextColor CHAR(9),
    ThemeTextTiltedColor CHAR(9)
);

CREATE TABLE IF NOT EXISTS Users(
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(64) UNIQUE NOT NULL,
    UserEmail VARCHAR(64) NOT NULL,
    UserPassword CHAR(64) NOT NULL,
    UserProfileImageUrl VARCHAR(255),
    UserProfileImagePoster VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS UserAuth(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE NOT NULL,
    Token CHAR(255) NOT NULL,
    FOREIGN KEY UserAuth(UserID) REFERENCES Users(UserID)
);

CREATE TABLE IF NOT EXISTS UserPrivileges(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    PrivilegeID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PrivilegeID) REFERENCES PrivilegeTypes(PrivilegeID)
);

CREATE TABLE IF NOT EXISTS UserDokiThemes(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    ThemeID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ThemeID) REFERENCES DokiThemes(ThemeID)
);

CREATE TABLE IF NOT EXISTS UserSavedAnimes(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AnimeID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

CREATE TABLE IF NOT EXISTS ChatEntry(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    PageUrl VARCHAR(255),
    FOREIGN KEY ChatEntry(UserID) REFERENCES Users(UserID)
);
