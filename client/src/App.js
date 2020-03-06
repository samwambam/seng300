import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App">
      <div class = "logo"></div>
      <div class = "login box"> {/*<!-- Div section for the login box -->*/}
        <header>Welcome to UWinnipeg Scholarships</header> {/*<!-- Header for the webpage-->*/}
        <form class = "login box" method = "POST"> {/*Form for the login box, calls method to send information to backend*/}
          <div>{/*Section for the ID text field*/}
          <input type = "text" placeholder = "ID" name = "ID" class = "id"></input>
          </div>
          <div>{/*Section for the password text field*/}
          <input type = "Password" placeholder = "Password" name = "password" class = "pword"></input>
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

export default App;
