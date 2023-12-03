import { useState } from "react";
import { platformClient } from "../api/PlatformClient";
import "./SignInStyle.css";
import { CircularProgress } from "@mui/material";

function SignIn({onLogin}) {
  const [errorMessages, setErrorMessages] = useState({name: "", message: ""});
  const [isLoading, setIsLoading] = useState(false)



  const handleSubmit = async (event) => {
    //Prevent page reload

    setIsLoading(true)
    event.preventDefault();

    const form = document.forms[0];

    // Access the values of the 'uname' and 'pass' input fields
    const uname = form.elements['uname'].value;
    const pass = form.elements['pass'].value;

    const response = await platformClient.requestLogin(uname, pass);
    console.log(response)

    if (response.success) {
        onLogin()
    } else {
        setErrorMessages(response.body)
        setIsLoading(false)
    }
  };

  // Generate JSX code for error message
  const renderErrorMessage = (name) =>
    name === errorMessages.name && (
      <div className="error">{errorMessages.message}</div>
    );

  // JSX code for login form
  const renderForm = (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label>Username </label>
          <input type="text" name="uname" required />
          {renderErrorMessage("uname")}
        </div>
        <div className="input-container">
          <label>Password </label>
          <input type="password" name="pass" required />
          {renderErrorMessage("pass")}
        </div>
        <div className="button-container">
            {isLoading? <CircularProgress/> : <input type="submit" />}
        </div>
      </form>
    </div>
  );

  return (
    <div className="app">
      <div className="login-form">
        <div className="title">Sign In</div>
        {renderForm}
      </div>
    </div>
  );
}

export default SignIn;