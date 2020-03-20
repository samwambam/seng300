import React, { Component } from 'react';
import './App.css';


class Login extends Component {

  render() {
    return (
        <div className="Login">
            <div className = "logo login"></div>

            <div className = "login box"> {/*<!-- Div section for the login box -->*/}
              <header>Welcome to UWinnipeg Scholarships</header> {/*<!-- Header for the webpage-->*/}

              <form className = "login box" method = "POST" action="auth"> {/*Form for the login box, calls method to send information to backend*/}
                <div>{/*Section for the ID text field*/}
                <input type = "text" placeholder = "ID" name = "username" className = "id"></input>
                </div>

                <div>{/*Section for the password text field*/}
                <input type = "Password" placeholder = "Password" name = "password" className = "pword"></input>
                </div>

                <div>{/*Section for the submit button*/}
                <input type = "submit" value = "Login"></input>
                </div>

              </form>

            </div>

        </div>
    );
  }
}

export default Login;
