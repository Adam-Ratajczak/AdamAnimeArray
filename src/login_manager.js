import {
  LoginUser,
  CreateUser,
  LogoutUser,
  GetUserInfo,
  GetWatchlist,
  AddToWatchlist,
  RemoveFromWatchlist,
  ReactToChatMessage,
  WriteChat,
  DelChat,
  GetUserReactions,
  GetUserTheme,
  GetWatched,
  GetFinished,
} from "./db_module";

function delay(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

class LoginManager {
  async login(user, passwd) {
    const response = await LoginUser(user, passwd);

    const status = response.status;

    if (status == 202) {
      const res = await response.json();
      localStorage.setItem("UserID", res.UserID);
      localStorage.setItem("Token", res.Token);
      localStorage.setItem("LoggedIn", true);

      return true;
    }

    return false;
  }

  async signup(user, email, passwd) {
    const response = await CreateUser(user, passwd, email);

    const status = response.status;

    if (status !== 202) {
      if (status > 500) {
        throw new Error("Server error.");
      }
      throw new Error((await response.json()).message);
    } else {
      return;
    }
  }

  async fetchUserInfo() {
    return (await GetUserInfo(this.UserID(), this.Token())).json();
  }

  async getWatchlist() {
    return (await GetWatchlist(this.UserID(), this.Token())).json();
  }

  async getWatched() {
    return (await GetWatched(this.UserID(), this.Token())).json();
  }

  async getFinished() {
    return (await GetFinished(this.UserID(), this.Token())).json();
  }

  async getTheme() {
    return (await GetUserTheme(this.UserID(), this.Token())).json();
  }

  async addToWatchlist(AnimeID) {
    return (await AddToWatchlist(this.Token(), AnimeID)).status === 200
      ? true
      : false;
  }

  async removeFromWatchlist(AnimeID) {
    return (await RemoveFromWatchlist(this.Token(), AnimeID)).status === 200
      ? true
      : false;
  }

  async writeComment(AnimeID, ReplyID, CommentText) {
    return (
      await WriteChat(this.Token(), AnimeID, ReplyID, CommentText)
    ).status() == 200
      ? true
      : false;
  }

  async delComment(AnimeID, EntryID) {
    return (await DelChat(this.Token(), AnimeID, EntryID)).status() == 200
      ? true
      : false;
  }

  async reactComment(EntryID, reaction) {
    return (
      await ReactToChatMessage(this.Token(), EntryID, reaction)
    ).status() == 200
      ? true
      : false;
  }

  UserReactions() {
    return GetUserReactions(this.UserID(), this.Token());
  }

  async check_credentials(permission) {
    // TODO
  }

  async logout() {
    const response = await LogoutUser(this.UserID(), this.Token());

    if (response.status === 202) {
      localStorage.setItem("UserID", -1);
      localStorage.setItem("Token", undefined);
      localStorage.setItem("LoggedIn", false);
      return true;
    }

    return false;
  }

  UserID() {
    return Number(localStorage.getItem("UserID"));
  }

  Token() {
    return localStorage.getItem("Token");
  }

  LoggedIn() {
    return localStorage.getItem("LoggedIn") === "true";
  }
}

let LoginMan = new LoginManager();
export default LoginMan;
