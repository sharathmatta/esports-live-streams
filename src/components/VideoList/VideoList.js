import React from "react";
import classes from "./VideoList.module.css";
import Spinner from "../../ui/spinner/Spinner";
import ReactPlayer from "react-player";
import { withRouter } from "react-router-dom";

const VideoList = (props) => {
  let clips = null;
  const videoClickHandler = (creator, type, id) => {
    const queryParams = encodeURIComponent(type) + "=" + encodeURIComponent(id);

    props.history.push({
      pathname: "/" + creator,
      search: "?" + queryParams,
    });
  };
  if (props.list) {
    clips = Object.keys(props.list).map((key) => {
      return (
        <div className={classes.VideoContent} key={key}>
          <div
            className={classes.SubVideosVideo}
            onClick={() =>
              videoClickHandler(
                props.list[key].creator,
                "watch",
                props.list[key].id
              )
            }
          >
            <div className={classes.VideoContainer}>
              <div className={classes.SubVideosPlayerWrapper}>
                <ReactPlayer
                  className={classes.ReactPlayer}
                  width="inherit"
                  height="inherit"
                  url={props.list[key].videoURL}
                  playing={false}
                  controls={false}
                />
              </div>
            </div>
            <div className={classes.VideoTitle}>{props.list[key].title}</div>
            <div className={classes.VideoUploadedOn}>
              <span>
                {new Date(props.list[key].timestamp.seconds * 1000).getDate()}/
                {new Date(props.list[key].timestamp.seconds * 1000).getMonth()}/
                {new Date(
                  props.list[key].timestamp.seconds * 1000
                ).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      );
    });
  } else {
    clips = <Spinner />;
  }
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

export default withRouter(VideoList);
