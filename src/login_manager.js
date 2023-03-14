import { LoginUser, CreateUser, LogoutUser, GetUserInfo } from "./db_module";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

class LoginManager{
    constructor(){
        localStorage.setItem("UserID", -1);
        localStorage.setItem("Token", undefined);
        localStorage.setItem("logged_in", false);
    }

    async login(user, passwd){
        const response = await LoginUser(user, passwd)

        const status = response.status

        if(status == 202){
            const res = await response.json()
            localStorage.setItem("UserID", res.UserID);
            localStorage.setItem("Token", res.Token);
            localStorage.setItem("logged_in", true);

            return true;
        }
        
        return false;
    }

    async signup(user, email, passwd){
        const response = await CreateUser(user, passwd, email)

        const status = response.status

        return status == 202
    }

    userinfo(){
        return GetUserInfo(this.UserID);
    }

    async check_credentials(permission){

    }

    async logout(){
        const response = await LogoutUser(this.UserID, this.Token)

        if(response.status == 202){
            localStorage.setItem("UserID", -1);
            localStorage.setItem("Token", undefined);
            localStorage.setItem("logged_in", false);
            return true;
        }

        return false;
    }

    UserID(){
        localStorage.getItem("UserID");
    }

    Token(){
        localStorage.getItem("Token");
    }

    LoggedIn(){
        localStorage.getItem("LoggedIn");
    }
}

let LoginMan = new LoginManager()
export default LoginMan;