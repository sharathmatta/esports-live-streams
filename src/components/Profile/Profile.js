import React from "react";
import classes from "./Profile.module.css";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import videoa from "../../assets/Selena Gomez - Feel Me (Live from the Revival Tour)_8N_Yro5QeCE_1080p.mp4";

const profile = (props) => {
  console.log(props.userId);
  return (
    <div className={classes.ProfileContainer}>
      <div className={classes.ProfileAndMainVid}>
        <div className={classes.Profile}>
          <div className={classes.ProfilePicture}>
            <img src={props.ProfilePicture} alt="dff" />
          </div>
          <div className={classes.StreamerDetails}>
            <div className={classes.UserName}>Ninja</div>
            <div className={classes.FollowerCount}>23482 Followers</div>
            <div className={classes.Games}>
              <ul className={classes.GameList}>
                <li>fortnite</li>
                <li>fortnite</li>
                <li>fortnite</li>
                <li>fortnite</li>
                <li>fortnite</li>
              </ul>
            </div>
          </div>
        </div>
        <div className={classes.PlayerWrapper}>
          <ReactPlayer
            className={classes.ReactPlayer}
            width="inherit"
            height="inherit"
            url={videoa}
            playing={false}
            controls={true}
          />
        </div>
      </div>

      <div className={classes.PastBroadcasts}>past broadcasts</div>
      <div className={classes.Clips}>clips</div>
      <div className={classes.Socials}>socials</div>
      <h1>Profile Component</h1>
    </div>
  );
};

const matchPropsToState = (state) => {
  return {
    userId: state.userId,
    ProfilePicture: state.profileURL,
  };
};

export default connect(matchPropsToState)(profile);
