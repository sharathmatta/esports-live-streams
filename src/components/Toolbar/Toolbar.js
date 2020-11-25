import React from "react";
import classes from "./Toolbar.module.css";
import NavItems from "../NavigationItems/NavigationItems";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../ui/Button/Button";
import * as actions from "../../store/actions/index";
import Logo from "../../assets/—Pngtree—game control line icon vector_5209084.png";
import { act } from "react-dom/test-utils";
import pp from "../../assets/Singer-Selena-Gomez-Background-Wallpapers-44158.jpg";

const toolbar = (props) => {
  return (
    <div className={classes.Toolbar}>
      <NavLink to="/">
        <div className={classes.Logo}>
          <img src={Logo} alt="logo" />
        </div>
      </NavLink>
      <div className={classes.BorderLine}></div>
      <div className={classes.ToolbarContent}>
        <div className={classes.NavItems}>
          <NavItems className={classes.NavItems} />
        </div>
        <div className={classes.NavItemsDrop}>
          <div className={classes.Dot}></div>
          <div className={classes.Dot}></div>
          <div className={classes.Dot}></div>
        </div>
        <div className={classes.RightContainer}>
          <NavLink
            to="/Profile"
            style={{ display: props.userId ? "block" : "none" }}
          >
            <div className={classes.Profile} onClick={() => props.onLogout()}>
              <img src={pp} alt="pp" />
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
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(toolbar);
