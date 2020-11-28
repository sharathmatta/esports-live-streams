import React, { useState } from "react";
import classes from "./Toolbar.module.css";
import NavItems from "../NavigationItems/NavigationItems";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../ui/Button/Button";
import * as actions from "../../store/actions/index";
import Logo from "../../assets/—Pngtree—game control line icon vector_5209084.png";

const Toolbar = (props) => {
  console.log(props.profileURL);

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
          >
            <div className={classes.Profile} onClick={() => props.onLogout()}>
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
    userId: state.userId,
    username: state.username,
    profileURL: state.profileURL,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Toolbar);
