import { LoginUser, CreateUser } from "./db_module";

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}

class LoginManager{
    async login(user, passwd){
        const response = await LoginUser(user, passwd)

        const status = response.status

        if(status == 202){
            const res = await response.json()
            this.UserID = res.UserID;
            this.Token = res.Token;
            this.login = true;

            return true;
        }
        
        return false;
    }

    async signup(user, email, passwd){
        const response = await CreateUser(user, passwd, email)

        const status = response.status

        return status == 202
    }

    check_credentials(permission){

    }
}

let LoginMan = new LoginManager()
export default LoginMan;