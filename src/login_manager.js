import { LoginUser, CreateUser, LogoutUser, GetUserInfo } from "./db_module";

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

    return status === 202;
  }

  userinfo() {
    return GetUserInfo(this.UserID(), this.Token());
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
