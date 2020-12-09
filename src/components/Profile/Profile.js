import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import { Link } from "react-router-dom";
import * as actions from "../../store/actions/index";
import VideoList from "../VideoList/VideoList";
import Spinner from "../../ui/spinner/Spinner";
import Button from "../../ui/Button/Button";
import Modal from "../../ui/modal/modal";
import Input from "../../ui/Input/Input";

const Profile = (props) => {
  const [videoDetails, setVideoDetails] = useState({
    video: {
      elementType: "file",
      elementConfig: {
        type: "file",
      },
      value: "",
      label: "Choose Video",
    },
    title: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Add Title",
      },
      value: "",
      label: "Title",
    },
    desc: {
      elementType: "input",
      elementConfig: {
        type: "text",
        placeholder: "Add Description",
      },
      value: "",
      label: "Description",
    },
  });
  const [uploading, setUploading] = useState(false);
  useEffect(() => {
    props.onProfileInit(props.match.params.username);
  }, [props.match.params.username]);

  const videoClickHandler = (type, link) => {
    const queryParams =
      encodeURIComponent(type) + "=" + encodeURIComponent(link);

    props.history.push({
      pathname: "/" + props.username,
      search: "?" + queryParams,
    });
  };
  const inputChangedHandler = (event, type) => {
    if (type === "video") {
      setVideoDetails({
        ...videoDetails,
        video: { ...videoDetails.video, value: event.target.value },
      });
    } else if (type === "title") {
      setVideoDetails({
        ...videoDetails,
        title: { ...videoDetails.title, value: event.target.value },
      });
    } else if (type === "desc") {
      setVideoDetails({
        ...videoDetails,
        desc: { ...videoDetails.desc, value: event.target.value },
      });
    }
  };
  let gameList = null;
  let uploads = null;
  let profile = null;
  let mainVideo = null;
  let uploadVideo = null;
  let videoUploader = null;

  const formElementsArray = [];
  for (let key in videoDetails) {
    formElementsArray.push({
      id: key,
      config: videoDetails[key],
    });
  }
  let form = formElementsArray.map((formElement) => (
    <Input
      key={formElement.id}
      elementType={formElement.config.elementType}
      elementConfig={formElement.config.elementConfig}
      value={formElement.config.value}
      label={formElement.config.label}
      changed={(event) => inputChangedHandler(event, formElement.id)}
    />
  ));

  if (uploading) {
    videoUploader = (
      <Modal show backDropClick={() => setUploading(false)}>
        <div className={classes.UploadVideoContainer}>
          <div className={classes.UploadVideoHeader}>Upload Video</div>
          <div className={classes.UploadFormContainer}>
            {form}
            <Button>Upload</Button>
          </div>
        </div>
      </Modal>
    );
  }
  if (props.currentuser === props.username) {
    uploadVideo = <Button clicked={() => setUploading(true)}>+ Upload</Button>;
  }
  if (props.uploads) {
    gameList = Object.keys(props.gamelist).map((key) => {
      return <li key={props.gamelist[key].id}>{props.gamelist[key].name}</li>;
    });
    profile = (
      <div className={classes.Profile}>
        {videoUploader}
        <div className={classes.ProfilePicture}>
          <img src={props.ProfilePicture} alt="dff" />
        </div>
        <div className={classes.StreamerDetails}>
          <div className={classes.UserName}>
            {props.username}
            {uploadVideo}
          </div>
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
    );
    mainVideo = (
      <div
        className={classes.PlayerWrapper}
        onClick={() => videoClickHandler("highlights", "")}
      >
        <ReactPlayer
          className={classes.ReactPlayer}
          width="inherit"
          height="inherit"
          url={props.mainvideo}
          playing={false}
          controls={true}
        />
      </div>
    );
    uploads = (
      <VideoList
        list={props.uploads}
        preTitle="Video"
        titleKeyword={"Uploads"}
        postTitle=""
        videoClicked={(type, link) => videoClickHandler(type, link)}
        loading={props.loading}
      />
    );
  }
  if (props.loading) {
    mainVideo = <Spinner />;
    uploads = <Spinner />;
    profile = <Spinner />;
  }

  return (
    <div className={classes.ProfileContainer}>
      <div className={classes.ProfileAndMainVid}>
        {profile}
        {mainVideo}
      </div>
      {uploads}
    </div>
  );
};

const matchPropsToState = (state) => {
  return {
    currentuser: state.auth.username,
    username: state.streamer.username,
    userId: state.streamer.userId,
    ProfilePicture: state.streamer.profileURL,

    followercount: state.streamer.followercount,
    mainvideo: state.streamer.mainvideo,
    uploads: state.streamer.uploads,
    gamelist: state.streamer.gamelist,
    loading: state.streamer.loading,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onProfileInit: (username) => dispatch(actions.initializeProfile(username)),
  };
};
export default connect(matchPropsToState, matchDispatchToProps)(Profile);
