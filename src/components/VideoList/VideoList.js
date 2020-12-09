import React from "react";
import classes from "./VideoList.module.css";
import Spinner from "../../ui/spinner/Spinner";
import ReactPlayer from "react-player";

const VideoList = (props) => {
  let clips = null;
  clips = Object.keys(props.list).map((key) => {
    return (
      <div
        className={classes.SubVideosVideo}
        key={key}
        onClick={() => props.videoClicked("clips", props.list[key].link)}
      >
        <div className={classes.VideoContainer}>
          <div className={classes.SubVideosPlayerWrapper}>
            <ReactPlayer
              className={classes.ReactPlayer}
              width="inherit"
              height="inherit"
              url={props.list[key].link}
              playing={false}
              controls={false}
            />
          </div>
        </div>
      </div>
    );
  });
  return (
    <div>
      <div className={classes.SubVideosContainer}>
        <div className={classes.SubVideosHeader}>
          {props.preTitle} <span>{props.titleKeyword}</span> {props.postTitle} :
        </div>
        <div className={classes.SubVideosFlexDiv}>{clips}</div>
      </div>
    </div>
  );
};

export default VideoList;
