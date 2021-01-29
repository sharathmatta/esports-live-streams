import React from "react";
import classes from "./VideoList.module.css";
import Spinner from "../../ui/spinner/Spinner";
import ReactPlayer from "react-player";
import { withRouter } from "react-router-dom";

const VideoList = (props) => {
  let clips = null;
  let list = null;
  if (props.list) {
    if (props.list.length > 0) {
      list = { ...props.list };
    }
    if (Object.keys(props.list).length > 0) {
      list = { ...props.list };
    }
  }
  //console.log("videolist", list);
  const videoClickHandler = (creator, type, id) => {
    const queryParams = encodeURIComponent(type) + "=" + encodeURIComponent(id);

    props.history.push({
      pathname: "/" + creator,
      search: "?" + queryParams,
    });
  };
  let content = null;
  if (list) {
    clips = Object.keys(list).map((key) => {
      return (
        <div className={classes.VideoContent} key={key}>
          <div
            className={classes.SubVideosVideo}
            onClick={() =>
              videoClickHandler(list[key].creator, "watch", list[key].id)
            }
          >
            <div className={classes.VideoContainer}>
              <div className={classes.SubVideosPlayerWrapper}>
                <ReactPlayer
                  className={classes.ReactPlayer}
                  width="inherit"
                  height="inherit"
                  url={list[key].videoURL}
                  playing={false}
                  controls={false}
                />
              </div>
            </div>
            <div className={classes.VideoTitle}>{list[key].title}</div>
            <div className={classes.VideoUploadedOn}>
              <span>
                {new Date(list[key].timestamp.seconds * 1000).getDate()}/
                {new Date(list[key].timestamp.seconds * 1000).getMonth() + 1}/
                {new Date(list[key].timestamp.seconds * 1000).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      );
    });
  } else {
    clips = <Spinner />;
  }
  if (list) {
    content = (
      <div className={classes.SubVideosContainer}>
        <div className={classes.SubVideosHeader}>
          {props.preTitle} <span>{props.titleKeyword}</span> {props.postTitle} :
        </div>
        <div className={classes.SubVideosFlexDiv}>{clips}</div>
      </div>
    );
  }
  return <div>{content}</div>;
};

export default withRouter(VideoList);
