import React, { useEffect, useState, useRef } from "react";
import * as actions from "../../store/actions/index";
import classes from "./Player.module.css";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import VideoList from "../VideoList/VideoList";
import ReactPlayer from "react-player";
import logi from "../../assets/Singer-Selena-Gomez-Background-Wallpapers-44158.jpg";
import vid from "../../assets/Selena Gomez - Feel Me (Live from the Revival Tour)_8N_Yro5QeCE_1080p.mp4";

const Player = (props) => {
  const [creator, setCreator] = useState(null);
  const [type, setType] = useState(null);
  const [id, setId] = useState(null);
  const myRef = useRef();
  useEffect(() => {
    myRef.current.scrollTo(0, 0);
    const query = new URLSearchParams(props.location.search);
    for (let param of query.entries()) {
      setType(param[0]);
      setId(param[1]);
    }
    setCreator(props.location.pathname.slice(1));
    props.onPlayerInit(creator, type, id);
  }, [creator, type, id, props.location]);
  let date = null;
  if (props.videoData.timestamp) {
    date = (
      <span>
        {new Date(props.videoData.timestamp.seconds * 1000).getDate()}/
        {new Date(props.videoData.timestamp.seconds * 1000).getMonth()}/
        {new Date(props.videoData.timestamp.seconds * 1000).getFullYear()}
      </span>
    );
  }
  let moreVideos = null;
  if (props.videoData.moreVideosCreator) {
    const game = props.videoData.game;
    moreVideos = (
      <div>
        <VideoList
          preTitle={"More videos from "}
          titleKeyword={creator}
          list={props.videoData.moreVideosCreator.slice(0, 3)}
        />
        <VideoList
          preTitle={"More "}
          titleKeyword={game}
          postTitle={"videos"}
          list={props.videoData.moreVideosGame.slice(0, 3)}
        />
      </div>
    );
  }
  return (
    <div className={classes.PlayerComponent} ref={myRef}>
      <div className={classes.PlayerContainer}>
        <div className={classes.VideoContainer}>
          <div className={classes.PlayerWrapper}>
            <ReactPlayer
              className={classes.ReactPlayer}
              height="inherit"
              width="inherit"
              url={props.videoData.videoURL}
              playing={true}
              controls={true}
            />
          </div>
        </div>
      </div>
      <div className={classes.VideoDetails}>
        <Link to={"/Profile/" + creator} className={classes.UserDetails}>
          <div className={classes.PPContainer}>
            <img src={props.videoData.profilePicURL} alt=" " />
          </div>
          <div className={classes.UserName}>{creator}</div>
        </Link>
        <div className={classes.VideoTitle}>
          Title : <span>{props.videoData.title}</span>
        </div>
        <div className={classes.UploadDate}>Uploaded On : {date}</div>
        <div className={classes.UploadDate}>
          Game Category : <span>{props.videoData.game}</span>
        </div>
        {moreVideos}
      </div>
    </div>
  );
};

const matchStateToProps = (state) => {
  return {
    videoData: state.player,
  };
};

const matchDispatchToProps = (dispatch) => {
  return {
    onPlayerInit: (creator, type, id) =>
      dispatch(actions.initializePlayer(creator, type, id)),
  };
};
export default connect(matchStateToProps, matchDispatchToProps)(Player);
