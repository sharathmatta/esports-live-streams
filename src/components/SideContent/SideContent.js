import React, { useEffect } from "react";
import classes from "./SideContent.module.css";
import logo from "../../assets/Singer-Selena-Gomez-Background-Wallpapers-44158.jpg";
import SideNavItems from "./SideNav/SideNavItems";
import { connect } from "react-redux";
import SigninMessage from "../SignInMessage/SignInMessage";
import Spinner from "../../ui/Spinner2/Spinner2";

const SideContent = (props) => {
  let followingComp = <Spinner />;
  let recommendedComp = <Spinner />;
  if (props.token) {
    followingComp = <Spinner />;
    recommendedComp = <Spinner />;
  } else {
    followingComp = null;
    recommendedComp = null;
  }
  if (props.following) {
    followingComp = (
      <div className={classes.SideSubBlock1}>
        <div className={classes.Header}>Following : </div>
        <SideNavItems list={props.following} />
      </div>
    );
    recommendedComp = (
      <div className={classes.SideSubBlock2}>
        <div className={classes.Header}>Recommended : </div>
        <SideNavItems list={props.recommended} />
      </div>
    );
  }

  return (
    <div className={classes.SideContainer}>
      {followingComp}
      {recommendedComp}
    </div>
  );
};

const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    username: state.auth.username,
    following: state.auth.following,
    recommended: state.auth.recommended,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {};
};

export default connect(matchStateToProps, matchDispatchToProps)(SideContent);
