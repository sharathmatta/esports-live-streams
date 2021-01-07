import React from "react";
import VideoList from "../../../components/VideoList/VideoList";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../../../firebase";
import SignInMessage from "../../../components/SignInMessage/SignInMessage";
import classes from "./HomeFollowing.module.css";

const HomeFollowing = (props) => {
  const [following, setFollowing] = useState(["Ninja", "Sykunno", "Brookeab"]);
  const [videos, setVideos] = useState(null);
  useEffect(() => {
    let videoCollection = [];

    db.collection("video-uploads")
      .get()
      .then((snapshot) => {
        snapshot.forEach((el) => {
          videoCollection.push({ id: el.id, ...el.data() });
        });
        setVideos(videoCollection.slice(0, 4));
      });
  }, []);

  let content = null;
  if (!props.token) {
    content = <SignInMessage />;
  }
  if (props.token && videos) {
    content = Object.keys(following).map((key) => {
      return (
        <div className={classes.CreatorVideoList} key={key}>
          <VideoList
            list={videos}
            preTitle={"Latest videos from"}
            titleKeyword={following[key]}
            postTitle={""}
          />
        </div>
      );
    });
  }
  return <div className={classes.HomeFollowing}>{content}</div>;
};
const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(matchStateToProps)(HomeFollowing);
