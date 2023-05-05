
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

CREATE TABLE IF NOT EXISTS ChatEntry(
    EntryID INT PRIMARY KEY AUTO_INCREMENT,
    UserID INT NOT NULL,
    AnimeID INT NOT NULL,
    OtherID INT,
    CommentText VARCHAR(65536),
    Submitted DATETIME,
    FOREIGN KEY (UserID) REFERENCES Users(UserID),
    FOREIGN KEY (AnimeID) REFERENCES Animes(AnimeID)
);

CREATE TABLE IF NOT EXISTS UserReactions(
    ReactionID INT PRIMARY KEY AUTO_INCREMENT,
    EntryID INT NOT NULL,
    UserID INT NOT NULL,
    ReactionType BIT,
    FOREIGN KEY (EntryID) REFERENCES ChatEntry(EntryID),
    FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
