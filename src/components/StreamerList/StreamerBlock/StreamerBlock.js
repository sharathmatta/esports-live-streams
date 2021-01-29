import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./StreamerBlock.module.css";
import blankStreamer from "../../../assets/—Pngtree—profile glyph black icon_4008321.png";

const streamerBlock = (props) => {
  let block = null;
  block = (
    <div className={classes.DummyStreamer}>
      <div className={classes.DummyStreamerImg}>
        <div className={classes.ForAnimation}></div>
      </div>
      <div className={classes.DummyStreamerName}></div>
    </div>
  );
  if (props.username && props.profilePic) {
    block = (
      <NavLink to={"/profile/" + props.username}>
        <div className={classes.Streamer}>
          <img
            src={props.profilePic}
            alt=""
            onError={(e) => {
              e.target.src = blankStreamer;
              e.target.onError = null;
            }}
          />
          <span>{props.username}</span>
        </div>
      </NavLink>
    );
  }
  return block;
};

export default streamerBlock;
