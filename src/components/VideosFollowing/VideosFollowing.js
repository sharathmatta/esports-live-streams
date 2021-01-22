import React from "react";
import VideoList from "../VideoList/VideoList";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import SignInMessage from "../SignInMessage/SignInMessage";
import classes from "./VideosFollowing.module.css";
import Spinner from "../../ui/Spinner2/Spinner2";

const HomeFollowing = (props) => {
  const [videos, setVideos] = useState(null);
  useEffect(() => {
    let videoCol = [];
    if (props.following) {
      Object.keys(props.following).forEach(async (key) => {
        let query = await db
          .collection("streamers")
          .doc(key)
          .collection("video-uploads")
          .get();
        let videoCollection = [];
        query.forEach((el) => {
          videoCollection.push({ id: el.id, ...el.data() });
        });
        if (videoCollection.length > 0) {
          videoCol[key] = videoCollection;
          setVideos((oldObj) => {
            let newObj = { ...oldObj };
            newObj = { ...newObj, [key]: videoCollection };
            return newObj;
          });
        }
      });
    }
  }, [props.following]);

  let content = <Spinner />;
  if (props.token && videos) {
    content = Object.keys(videos).map((key) => {
      return (
        <VideoList
          key={key}
          list={videos[key]}
          preTitle={"latest videos from "}
          titleKeyword={key}
          postTitle={""}
        />
      );
    });
  }
  if (!props.token) {
    content = <SignInMessage />;
  }
  if (props.token && videos) {
  }
  return <div className={classes.HomeFollowing}>{content}</div>;
};
const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    following: state.auth.following,
  };
};
export default connect(matchStateToProps)(HomeFollowing);
