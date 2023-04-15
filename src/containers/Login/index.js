import React, { useRef, useState } from "react";
import LoginMan from "../../login_manager";
import redirect from "../../redirect";
import "./style.scss";

function Login() {
  const user = useRef();
  const passwd = useRef();
  const remember = useRef();
  const [errorMsg, setErrorMsg] = useState("");

  const sendOnClick = async (event) => {
    let res = await LoginMan.login(user.current.value, passwd.current.value);

    if (res) {
      redirect("/");
    } else {
      // FIXME: Display more info from server here.
      setErrorMsg("Login failed");
    }
  };

  return (
    <div id="content">
      <div id="AlignToCenter">
        <div id="LoginForm">
          <h1>Login to AAA!</h1>
          <table>
            <tbody>
              <tr>
                <td>Username:</td>
                <td class="RightLogin">
                  <input type="text" ref={user} name="Username" required />
                </td>
              </tr>
              <tr>
                <td>Password:</td>
                <td class="RightLogin">
                  <input type="password" ref={passwd} name="Passwd" required />
                </td>
              </tr>
              <tr>
                <td>
                  <label>
                    Remember me:{" "}
                    <input type="checkbox" ref={remember} name="Remember" />
                  </label>
                </td>
                <td class="RightLogin">
                  <button id="Send" onClick={sendOnClick} name="Send">
                    Log in
                  </button>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <a id="LoginLink" href="/Signup">
                    No account? Sign up now for free!
                  </a>
                </td>
              </tr>
              <tr>
                <td colspan="2">
                  <p id="ErrorMsg">{errorMsg}</p>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Login;
