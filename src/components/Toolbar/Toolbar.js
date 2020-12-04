import React from "react";
import classes from "./Toolbar.module.css";
import NavItems from "../NavigationItems/NavigationItems";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../ui/Button/Button";
import * as actions from "../../store/actions/index";

const Toolbar = (props) => {
  const profileClickHandler = () => {
    props.onProfileInit(props.username);
  };
  return (
    <div className={classes.Toolbar}>
      <div className={classes.ToolbarContent}>
        <div className={classes.NavItems}>
          <NavItems className={classes.NavItems} />
        </div>
        <div className={classes.RightContainer}>
          <NavLink
            to="/Profile"
            style={{ display: props.userId ? "block" : "none" }}
            onClick={() => profileClickHandler()}
          >
            <div className={classes.Profile}>
              <img src={props.profileURL} alt="pp" />
            </div>
          </NavLink>
          <NavLink
            to="/signin"
            style={{ display: props.userId ? "none" : "block" }}
          >
            <div className={classes.SignIn} onClick={props.SignInClicked}>
              <Button>Sign In</Button>
            </div>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

const matchStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    username: state.auth.username,
    profileURL: state.auth.profileURL,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onProfileInit: (username) => dispatch(actions.initializeProfile(username)),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Toolbar);
