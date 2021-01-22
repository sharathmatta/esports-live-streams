import React, { Component } from "react";
import Logo from "../../assets/—Pngtree—game control line icon vector_5209084.png";
import Login from "./Login/Login";
import Signup from "./Signup/Signup";
import classes from "./SignIn.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import Aux from "../../hoc/Auxiliary";
import SelectStreamers from "./Signup/SelectStreamers/SelectStreamers";
import SelectGames from "./Signup/SelectGames/SelectGames";
import Spinner from "../../ui/spinner/Spinner";
import * as actions from "../../store/actions/index";

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
    let authRedirect = null;
    if (this.props.token && !this.props.signUpComplete) {
      authRedirect = <Redirect to="/" />;
    }
    const signInOption = this.state.logIn ? <Login /> : <Signup />;
    const message = this.state.logIn
      ? "Login To EsportsLive"
      : "Join EsportsLive Today";

    const beforeAuth = (
      <Aux>
        {authRedirect}
        <div className={classes.Header}>
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
      </Aux>
    );

    let afterAuth = <Spinner />;
    if (!this.props.streamersSelected && this.props.username) {
      afterAuth = (
        <SelectStreamers
          currentuser={this.props.username}
          skipped={this.props.onStreamersSkipped}
          continued={(streamers) =>
            this.props.onSelectedStreamers(this.props.username, streamers)
          }
        />
      );
    }
    if (this.props.streamersSelected && this.props.username) {
      if (!this.props.gamesSelected) {
        afterAuth = (
          <SelectGames
            skipped={this.props.onGamesSkipped}
            continued={(games) =>
              this.props.onSelectedGames(this.props.username, games)
            }
          />
        );
      }
    }

    return (
      <div className={classes.SignIn}>
        {this.props.token ? afterAuth : beforeAuth}
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    signUpComplete: state.auth.signUpComplete,
    streamersSelected: state.auth.streamersSelected,
    gamesSelected: state.auth.gamesSelected,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onSelectedStreamers: (user, streamers) =>
      dispatch(actions.initializeStreamerFollow(user, streamers)),
    onStreamersSkipped: () => dispatch(actions.skippedStreamers()),
    onSelectedGames: (user, games) =>
      dispatch(actions.initializeGameFollow(user, games)),
    onGamesSkipped: () => dispatch(actions.skippedGames()),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(SignIn);
