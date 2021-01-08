import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import * as actions from "../../store/actions/index";
import VideoList from "../VideoList/VideoList";
import Spinner from "../../ui/spinner/Spinner";
import Button from "../../ui/Button/Button";
import Modal from "../../ui/modal/modal";
import Input from "../../ui/Input/Input";
import { db, storage } from "../../firebase";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";

const Profile = (props) => {
  const [videoDetails, setVideoDetails] = useState({
    video: {
      elementType: "file",
      elementConfig: {
        type: "file",
      },
      value: null,
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
  const [uploadVid, setUploadVid] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);
  useEffect(() => {
    if (props.loginChecked) {
      props.onProfileInit(props.match.params.username);
    }
  }, [props.match.params.username, props.loginChecked]);

  const videoClickHandler = (type, id) => {
    const queryParams = encodeURIComponent(type) + "=" + encodeURIComponent(id);

    props.history.push({
      pathname: "/" + props.username,
      search: "?" + queryParams,
    });
  };
  const inputChangedHandler = (event, type) => {
    setUploaded(false);
    setUploading(false);
    if (type === "video") {
      setVideoDetails({
        ...videoDetails,
        video: { ...videoDetails.video, value: event.target.files[0] },
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
  const uploadCancelled = () => {
    setUploadVid(false);
    setUploading(false);
    setVideoDetails({
      ...videoDetails,
      video: { ...videoDetails.video, value: null },
      title: { ...videoDetails.title, value: "" },
      desc: { ...videoDetails.desc, value: "" },
    });
    setUploaded(false);
  };
  const videoUploadHandler = () => {
    setUploading(true);
    const video = videoDetails.video.value;
    const title = videoDetails.title.value;
    const desc = videoDetails.desc.value;
    const task = storage.ref("uploads/" + video.name).put(video);
    task.on(
      "state_changed",
      (snapshot) => {
        setUploadPercent(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
        if ((snapshot.bytesTransferred / snapshot.totalBytes) * 100 === 100) {
          setUploaded(true);
        }
      },
      (err) => {},
      () => {
        storage
          .ref("uploads/" + video.name)
          .getDownloadURL()
          .then((url) => {
            db.collection("video-uploads").add({
              creator: props.currentuser,
              videoURL: url,
              timestamp: new Date(),
              title: title,
              desc: desc,
            });
          });
      }
    );
  };
  let gameList = null;
  let uploads = null;
  let profile = null;
  let mainVideo = null;
  let uploadVideo = null;
  let videoUploader = null;
  let uploadProgress = (
    <Button
      clicked={videoUploadHandler}
      disable={
        !(
          videoDetails.video.value &&
          videoDetails.title.value &&
          videoDetails.desc.value
        )
      }
    >
      Upload
    </Button>
  );

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
  if (uploadVid) {
    if (uploading) {
      uploadProgress = <ProgressBar percentage={uploadPercent} />;
    }
    if (uploaded) {
      uploadProgress = "Video Uploaded!";
    }
    videoUploader = (
      <Modal show backDropClick={uploadCancelled}>
        <div className={classes.UploadVideoContainer}>
          <div className={classes.UploadVideoHeader}>Upload Video</div>
          <div className={classes.UploadFormContainer}>
            {form}
            <div className={classes.UploadProgress}>{uploadProgress}</div>
          </div>
        </div>
      </Modal>
    );
  }
  if (props.currentuser === props.username) {
    uploadVideo = <Button clicked={() => setUploadVid(true)}>+Upload</Button>;
  } else {
    if (props.following) {
      uploadVideo = <Button>Following</Button>;
    } else {
      uploadVideo = <Button>Follow</Button>;
    }
  }
  if (props.uploads) {
    gameList = Object.keys(props.gamelist).map((key) => {
      return <li key={props.gamelist[key].id}>{props.gamelist[key].name}</li>;
    });
    profile = (
      <div className={classes.Profile}>
        {videoUploader}
        <div className={classes.ProfilePicture}>
          <img src={props.ProfilePicture} alt=" " />
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
        className={classes.VideoList}
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
    mainVideo = (
      <div className={classes.Loading}>
        <Spinner />
      </div>
    );
    uploads = <Spinner />;
    profile = (
      <div className={classes.Loading}>
        <Spinner />
      </div>
    );
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
    following: state.streamer.following,
    loginChecked: state.auth.loginChecked,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onProfileInit: (username) => dispatch(actions.initializeProfile(username)),
  };
};
export default connect(matchPropsToState, matchDispatchToProps)(Profile);
