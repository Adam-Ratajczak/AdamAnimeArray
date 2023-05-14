
-- user privileges over anime database
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

-- user main table
CREATE TABLE IF NOT EXISTS Users(
    UserID INT PRIMARY KEY AUTO_INCREMENT,
    UserName VARCHAR(64) UNIQUE NOT NULL,
    UserEmail VARCHAR(64) NOT NULL,
    UserPassword CHAR(64) NOT NULL,
    UserProfileImageUrl VARCHAR(255),
    UserProfileImagePoster VARCHAR(255)
);

-- user token table needed for user sessions
CREATE TABLE IF NOT EXISTS UserAuth(
    TokenID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT UNIQUE NOT NULL,
    Token CHAR(255) NOT NULL,
    FOREIGN KEY UserAuth(UserID) REFERENCES Users(UserID)
);

-- user => privilege binding 
CREATE TABLE IF NOT EXISTS UserPrivileges(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    PrivilegeID INT NOT NULL,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (PrivilegeID) REFERENCES PrivilegeTypes(PrivilegeID)
);

-- chat under anime webpage
CREATE TABLE IF NOT EXISTS ChatEntry(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AnimeID INT NOT NULL,
    OtherID INT,
    CommentText TEXT,
    Submitted DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

-- upvotes and downvotes
CREATE TABLE IF NOT EXISTS UserReactions(
    ReactionID INT PRIMARY KEY AUTO_INCREMENT,
    EntryID INT NOT NULL,
    UserID INT NOT NULL,
    ReactionType INT,
    FOREIGN KEY (EntryID) REFERENCES ChatEntry(EntryID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);

-- theme colors
CREATE TABLE IF NOT EXISTS DokiThemes(
    ThemeID INT PRIMARY KEY AUTO_INCREMENT,
    BaseColor CHAR(9) NOT NULL,
    BgColor CHAR(9) NOT NULL,
    BgColorDark CHAR(9) NOT NULL,
    BgColorTheme CHAR(9) NOT NULL,
    BgColorTilted CHAR(9) NOT NULL,
    BtnHoverColor CHAR(9) NOT NULL,
    BtnHoverTextColor CHAR(9) NOT NULL,
    FgColor CHAR(9) NOT NULL,
    FgColorDark CHAR(9) NOT NULL,
    TextColor CHAR(9) NOT NULL,
    TextColorDark CHAR(9) NOT NULL,
    TextColorTilted CHAR(9) NOT NULL
);
INSERT INTO DokiThemes(ThemeID, BaseColor, BgColor, BgColorDark, BgColorTheme, BgColorTilted, BtnHoverColor, BtnHoverTextColor, FgColor, FgColorDark, TextColor, TextColorDark, TextColorTilted) VALUES(1, 
    '#011e2dff',
    '#444444ff',
    '#333333ff',
    '#222233ff',
    '#33333eff',
    '#2e2e6555',
    '#f4f4ffff',
    '#a334e8ff',
    '#630f78ff',
    '#ffffffff',
    '#f5f5f5ff',
    '#add8e6ff'
);

-- user => themes binding
CREATE TABLE IF NOT EXISTS UserDokiThemes(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    ThemeID INT NOT NULL,
    BgPosterLeft VARCHAR(64),
    BgPosterRight VARCHAR(64),
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (ThemeID) REFERENCES DokiThemes(ThemeID)
);
