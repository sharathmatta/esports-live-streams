import React, { Component } from "react";
import Logo from "../../assets/—Pngtree—game control line icon vector_5209084.png";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import classes from "./SignIn.module.css";

class SignIn extends Component {
  state = {
    logIn: true,
  };
  loginClickHandler = () => {
    this.setState({ logIn: true });
  };
  signupClickHandler = () => {
    this.setState({ logIn: false });
  };
  render() {
    const signInOption = this.state.logIn ? <Login /> : <Signup />;
    const message = this.state.logIn
      ? "Login To EsportsLive"
      : "Join EsportsLive Today";
    return (
      <div className={classes.SignIn}>
        <div className={classes.Header}>
          <div className={classes.Logo}>
            <img src={Logo} alt="logo" />
          </div>
          <div className={classes.Message}>{message}</div>
        </div>
        <div className={classes.SignInOptions}>
          <div className={classes.LoginOption} onClick={this.loginClickHandler}>
            Login
          </div>
          <div
            className={classes.SignupOption}
            onClick={this.signupClickHandler}
          >
            Sign Up
          </div>
        </div>
        <div className={classes.formContainer}>{signInOption}</div>
      </div>
    );
  }
}

export default SignIn;
