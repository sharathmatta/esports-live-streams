import React from "react";
import SignInMessage from "../SignInMessage/SignInMessage";
import classes from "./Following.module.css";

const following = () => {
  return (
    <div className={classes.Following}>
      <SignInMessage />
    </div>
  );
};

export default following;
