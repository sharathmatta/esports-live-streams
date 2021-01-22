import React, { useState, useEffect } from "react";
import classes from "./Profile.module.css";
import { connect } from "react-redux";
import ReactPlayer from "react-player";
import * as actions from "../../store/actions/index";
import VideoList from "../VideoList/VideoList";
import Spinner from "../../ui/spinner/Spinner";
import Button from "../../ui/Button/Button";
import blankProfile from "../../assets/blank-profile-picture-973460_1280.png";
import Modal from "../../ui/modal/modal";
import Input from "../../ui/Input/Input";
import { db, storage } from "../../firebase";
import ProgressBar from "../../ui/ProgressBar/ProgressBar";

const Profile = (props) => {
  const [games, setGames] = useState(null);
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
    gameCategory: {
      elementType: "select",
      elementConfig: {
        options: [],
      },
      value: "",
    },
  });
  const [uploadVid, setUploadVid] = useState(false);
  const [selectMainVid, setSelectMainVid] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [uploadPercent, setUploadPercent] = useState(0);

  useEffect(() => {
    if (props.loginChecked) {
      props.onProfileInit(props.currentuser, props.match.params.username);
    } else {
      props.onProfileInit(null, props.match.params.username);
    }
  }, [props.match.params.username, props.loginChecked]);
  useEffect(() => {
    setVideoDetails((oldObj) => {
      const newObj = { ...oldObj };
      newObj.gameCategory.elementConfig.options = props.allgames;
      return newObj;
    });
  }, [props.allgames]);
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
    } else if (type === "gameCategory") {
      setVideoDetails({
        ...videoDetails,
        gameCategory: {
          ...videoDetails.gameCategory,
          value: event.target.value,
        },
      });
    }
  };
  const uploadCancelled = () => {
    setUploadVid(false);
    setSelectMainVid(false);
    setUploading(false);
    setVideoDetails({
      ...videoDetails,
      video: { ...videoDetails.video, value: null },
      title: { ...videoDetails.title, value: "" },
      desc: { ...videoDetails.desc, value: "" },
      gameCategory: { ...videoDetails.gameCategory, value: "" },
    });
    setUploaded(false);
  };
  const videoUploadHandler = async () => {
    setUploading(true);
    const video = videoDetails.video.value;
    const title = videoDetails.title.value;
    const desc = videoDetails.desc.value;
    const gameCategory = videoDetails.gameCategory.value;
    const timestamp = new Date();
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
            db.collection("streamers")
              .doc(props.currentuser)
              .collection("video-uploads")
              .add({
                creator: props.currentuser,
                videoURL: url,
                timestamp: timestamp,
                title: title,
                desc: desc,
                game: gameCategory,
              })
              .then((snapshot) => {
                db.collection("game")
                  .doc(gameCategory)
                  .collection("videos")
                  .doc(snapshot.id)
                  .set({
                    creator: props.currentuser,
                    videoURL: url,
                    timestamp: timestamp,
                    title: title,
                    desc: desc,
                    game: gameCategory,
                  })
                  .then((ss) => {
                    if (selectMainVid) {
                      db.collection("streamers").doc(props.currentuser).update({
                        mainvideo: url,
                        mainvideoId: snapshot.id,
                      });
                    }
                  });
              });
          });
      }
    );
  };

  const unfollowClicked = () => {
    props.onUnfollowInit(props.currentuser, props.username);
  };
  const followClicked = () => {
    props.onFollowInit(props.currentuser, props.username);
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
          videoDetails.desc.value &&
          videoDetails.gameCategory.value
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
  if (uploadVid || selectMainVid) {
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
  } else if (props.token) {
    if (props.following) {
      uploadVideo = <Button clicked={unfollowClicked}>Following</Button>;
    } else {
      uploadVideo = <Button clicked={followClicked}>Follow</Button>;
    }
  }
  if (props.username) {
    gameList = Object.keys(props.gamelist).map((key) => {
      return <li key={key}>{props.gamelist[key].id}</li>;
    });
    profile = (
      <div className={classes.Profile}>
        {videoUploader}
        <div className={classes.ProfilePicture}>
          <img
            src={props.ProfilePicture}
            alt=" "
            onError={(e) => {
              e.target.src = blankProfile;
            }}
          />
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
        {props.mainVideo ? null : (
          <div className={classes.NoMainVideo}>
            <div className={classes.NoMainVideoMessage}>
              Add a Highlight video
            </div>
            <Button clicked={() => setSelectMainVid(true)}>Select</Button>
          </div>
        )}
      </div>
    );
    if (props.mainvideo) {
      mainVideo = (
        <div
          className={classes.PlayerWrapper}
          onClick={() => videoClickHandler("watch", props.mainvideoId)}
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
    } else if (props.currentuser === props.username) {
      mainVideo = null;
    }
    if (props.uploads) {
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
    } else {
      uploads = (
        <div className={classes.NoUploads}>
          <div className={classes.NoUploadsMessage}>No Video Uploads Yet</div>
          {props.currentuser === props.username ? (
            <Button
              clicked={() => {
                setUploadVid(true);
              }}
            >
              +Upload
            </Button>
          ) : null}
        </div>
      );
    }
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
    token: state.auth.token,
    currentuser: state.auth.username,
    username: state.streamer.username,
    userId: state.streamer.userId,
    ProfilePicture: state.streamer.profileURL,
    followercount: state.streamer.followercount,
    mainvideo: state.streamer.mainvideo,
    mainvideoId: state.streamer.mainvideoId,
    uploads: state.streamer.uploads,
    gamelist: state.streamer.gamelist,
    loading: state.streamer.loading,
    following: state.streamer.following,
    loginChecked: state.auth.loginChecked,
    allgames: state.auth.allgames,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onUnfollowInit: (user, creator) =>
      dispatch(actions.initializeUnfollow(user, creator)),
    onFollowInit: (user, creator) =>
      dispatch(actions.initializeFollow(user, creator)),
    onProfileInit: (user, creator) =>
      dispatch(actions.initializeProfile(user, creator)),
  };
};
export default connect(
  matchPropsToState,
  matchDispatchToProps
)(React.memo(Profile));
