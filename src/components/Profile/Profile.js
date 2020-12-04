import React from "react";
import classes from "./Profile.module.css";
import { connect } from "react-redux";
import ReactPlayer from "react-player";

const profile = (props) => {
  let gameList = null;
  let clips = null;
  let pastBroadcasts = null;
  if (props.pastbroadcasts) {
    gameList = Object.keys(props.gamelist).map((key) => {
      return <li key={props.gamelist[key].id}>{props.gamelist[key].name}</li>;
    });
    pastBroadcasts = Object.keys(props.pastbroadcasts).map((key) => {
      return (
        <div key={key} className={classes.SubVideosVideo}>
          <div className={classes.VideoContainer}>
            <div className={classes.SubVideosPlayerWrapper}>
              <ReactPlayer
                className={classes.ReactPlayer}
                width="inherit"
                height="inherit"
                url={props.pastbroadcasts[key].link}
                playing={false}
                controls={true}
              />
            </div>
          </div>
        </div>
      );
    });
    clips = Object.keys(props.clips).map((key) => {
      return (
        <div key={key} className={classes.SubVideosVideo}>
          <div className={classes.VideoContainer}>
            <div className={classes.SubVideosPlayerWrapper}>
              <ReactPlayer
                className={classes.ReactPlayer}
                width="inherit"
                height="inherit"
                url={props.clips[key].link}
                playing={false}
                controls={true}
              />
            </div>
          </div>
        </div>
      );
    });
  }
  return (
    <div className={classes.ProfileContainer}>
      <div className={classes.ProfileAndMainVid}>
        <div className={classes.Profile}>
          <div className={classes.ProfilePicture}>
            <img src={props.ProfilePicture} alt="dff" />
          </div>
          <div className={classes.StreamerDetails}>
            <div className={classes.UserName}>{props.username}</div>
            <div className={classes.FollowerCount}>
              {Math.round(
                props.followercount + Math.random() * (props.followercount / 10)
              )}{" "}
              Followers
            </div>
            <div className={classes.Games}>
              <ul className={classes.GameList}>{gameList}</ul>
            </div>
          </div>
        </div>
        <div className={classes.PlayerWrapper}>
          <ReactPlayer
            className={classes.ReactPlayer}
            width="inherit"
            height="inherit"
            url={props.mainvideo}
            playing={false}
            controls={true}
          />
        </div>
      </div>

      <div className={classes.SubVideosContainer}>
        <div className={classes.SubVideosHeader}>
          Past <span>Broadcasts</span> :
        </div>
        <div className={classes.SubVideosFlexDiv}>{pastBroadcasts}</div>
      </div>
      <div className={classes.SubVideosContainer}>
        <div className={classes.SubVideosHeader}>
          Popular <span>Clips</span> :
        </div>
        <div className={classes.SubVideosFlexDiv}>{clips}</div>
      </div>
      <div className={classes.Socials}>socials</div>
    </div>
  );
};

const matchPropsToState = (state) => {
  return {
    username: state.auth.username,
    userId: state.auth.userId,
    ProfilePicture: state.auth.profileURL,
    followercount: state.streamer.followercount,
    mainvideo: state.streamer.mainvideo,
    pastbroadcasts: state.streamer.pastbroadcasts,
    clips: state.streamer.clips,
    gamelist: state.streamer.gamelist,
  };
};

export default connect(matchPropsToState)(profile);
