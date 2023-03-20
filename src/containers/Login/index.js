import React, {Component} from 'react'
import LoginMan from '../../login_manager';
import redirect from '../../redirect';
import {Menubar} from '../../widgets'
import './style.scss';
import {NavLink} from 'react-router-dom';

class Login extends Component {
  render() {
    return (
      <div id="main">
        <Menubar/>

        <div id="content">
          <div id="AlignToCenter">
            <div id="LoginForm">
              <h1>Login to AAA!</h1>
              <table>
                <tbody>
                  <tr><td>Username:</td><td class="RightLogin"><input type="text" id="Username" name="Username" required/></td></tr>
                  <tr><td>Password:</td><td class="RightLogin"><input type="password" id="Passwd" name="Passwd" required/></td></tr>
                  <tr><td><label>Remember me: <input type="checkbox" id="Remember" name="Remember" /></label></td><td class="RightLogin"><button id="Send" name="Send" >Log in</button></td></tr>
                  <tr><td colspan="2"><NavLink id="LoginLink" to="/Signup">No account? Sign up now for free!</NavLink></td></tr>
                  <tr><td colspan="2"><p id="ErrorMsg">Username or password incorrect!</p></td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }

  componentDidMount(){
    document.getElementById("Send").onclick = async (event) =>{
      let user = document.getElementById("Username").value;
      let passwd = document.getElementById("Passwd").value;
      let interrupt = false;

      const foo = (id) => {
        document.getElementById(id).style.border = "1px solid black";
        if(document.getElementById(id).value.length == 0){
          document.getElementById(id).style.border = "2px solid red";
          interrupt = true;
        }
      }
      
      foo("Username")
      foo("Passwd")

      if(interrupt){
        return;
      }

      let res = await LoginMan.login(user, passwd);

      if(res){
        redirect("/")
      }else{
        document.getElementById("ErrorMsg").style.color = "red";
      }
    }
  }
}

export default Login
