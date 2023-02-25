import React, {Component} from 'react'
import LoginMan from '../../login_manager';
import redirect from '../../redirect';
import {Menubar} from '../../widgets'
import './style.scss';

class Signup extends Component {
  render() {
    return (
      <div id="main">
        <Menubar/>

        <div id="content">
          <div id="AlignToCenter">
            <div id="LoginForm">
              <h1>Sign up to AAA!</h1>
              <table>
                <tbody>
                  <tr><td>Username:</td><td class="RightLogin"><input type="text" id="Username" name="Username" /></td></tr>
                  <tr><td>Email:</td><td class="RightLogin"><input type="text" id="Email" name="Email" /></td></tr>
                  <tr><td>Password:</td><td class="RightLogin"><input type="password" id="Passwd" name="Passwd" /></td></tr>
                  <tr><td>Confirm password:</td><td class="RightLogin"><input type="password" id="ConfirmPasswd" name="ConfirmPasswd" /></td></tr>
                  <tr><td></td><td class="RightLogin"><button id="Send" name="Send" >Log in</button></td></tr>
                  <tr><td colspan="2"><a id="LoginLink" href="/Login">Already have account? Login now!</a></td></tr>
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
      let email = document.getElementById("Email").value;
      let passwd = document.getElementById("Passwd").value;
      let confirmed = document.getElementById("ConfirmPasswd").value;
      let interrupt = false;

      const foo = (id) => {
        document.getElementById(id).style.border = "1px solid black";
        if(document.getElementById(id).value.length == 0){
          document.getElementById(id).style.border = "2px solid red";
          interrupt = true;
        }
      }
      
      foo("Username");
      foo("Email")
      foo("Passwd")
      foo("ConfirmPasswd")

      if(interrupt){
        return;
      }
      let pattern = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/;

      if(!pattern.exec(passwd)){
        document.getElementById("ErrorMsg").innerText = "Password should be 8 characters long, have at least 1 digit, 1 letter and 1 special character...";
        document.getElementById("ErrorMsg").style.color = "red";

        return;
      }

      if(passwd != confirmed){
        document.getElementById("ErrorMsg").innerText = "Password and confirmed password doesn't match";
        document.getElementById("ErrorMsg").style.color = "red";

        return;
      }

      let res = await LoginMan.signup(user, email, passwd);

      if(res){
        redirect("/login")
      }else{
        document.getElementById("ErrorMsg").innerText = "User with given name already exists!";
        document.getElementById("ErrorMsg").style.color = "red";

        return;
      }
    }
  }
}

export default Signup