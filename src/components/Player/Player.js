import React, { useEffect } from "react";
import * as actions from "../../store/actions/index";
import classes from "./Player.module.css";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import logi from "../../assets/Singer-Selena-Gomez-Background-Wallpapers-44158.jpg";
import vid from "../../assets/Selena Gomez - Feel Me (Live from the Revival Tour)_8N_Yro5QeCE_1080p.mp4";

const Player = (props) => {
  //   useEffect(() => {
  //     const query = new URLSearchParams(props.location.search);
  //     console.log(props.location.search);
  //     let type = null;
  //     let link = null;
  //     for (let param of query.entries()) {
  //       type = param[0];
  //       link = param[1];
  //     }
  //   }, []);
  let username = "Sharath";
  return (
    <div className={classes.PlayerComponent}>
      <div className={classes.PlayerContainer}>
        <div className={classes.VideoContainer}>
          <div className={classes.PlayerWrapper}>
            <ReactPlayer
              className={classes.ReactPlayer}
              height="inherit"
              width="inherit"
              url={vid}
              playing={true}
              controls={true}
            />
          </div>
        </div>
      </div>
      <div className={classes.VideoDetails}>
        <div className={classes.UserDetails}>
          <div className={classes.PPContainer}>
            <img src={logi} alt="pp" />
          </div>
          <div className={classes.UserName}>Sharath</div>
        </div>
        <div className={classes.VideoTitle}>
          Title :{" "}
          <span>
            These metrics are estimates (updated every few hours) and are not an
            accurate reflection of your bill
          </span>
        </div>
        <div className={classes.UploadDate}>
          Uploaded On : <span>{new Date().toUTCString()}</span>
        </div>
      </div>
    </div>
  );
};
// const matchDispatchToProps = (dispatch) => {
//   return {
//     onPlayerInit: (type, link) =>
//       dispatch(actions.initializePlayer(type, link)),
//   };
// };
export default Player;
