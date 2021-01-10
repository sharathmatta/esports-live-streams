import React from "react";
import SignInMessage from "../SignInMessage/SignInMessage";
import HomeFollowing from "../VideosFollowing/VideosFollowing";
import StreamersFollowing from "../StreamersFollowing/StreamersFollowing";
import { connect } from "react-redux";
import classes from "./Following.module.css";

const following = (props) => {
  let content = null;
  if (!props.token) {
    content = (
      <div className={classes.SignInMessage}>
        <SignInMessage />
      </div>
    );
  }
  if (props.token) {
    content = (
      <div className={classes.Following}>
        <StreamersFollowing />
        <HomeFollowing />
      </div>
    );
  }
  return <div className={classes.FollowingContainer}>{content}</div>;
};

const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {};
};

export default connect(matchStateToProps, matchDispatchToProps)(following);
