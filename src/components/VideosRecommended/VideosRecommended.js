import React from "react";
import VideoList from "../VideoList/VideoList";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import classes from "./VideosRecommended.module.css";

const HomeRecommended = (props) => {
  const [gameTypes, setGameTypes] = useState([
    "Minecraft",
    "Fortnite",
    "Call of Duty",
  ]);
  const [creators, setCreators] = useState(["Ninja", "Brookeab", "sykunno"]);
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

  let gameTypeContent = null;
  let creatorContent = null;
  if (videos) {
    gameTypeContent = Object.keys(gameTypes).map((key) => {
      return (
        <div className={classes.CreatorVideoList} key={key}>
          <VideoList
            list={videos}
            preTitle={"Recommended"}
            titleKeyword={gameTypes[key]}
            postTitle={"videos"}
          />
        </div>
      );
    });
    if (props.token) {
      creatorContent = Object.keys(creators).map((key) => {
        return (
          <div className={classes.CreatorVideoList} key={key}>
            <VideoList
              list={videos}
              preTitle={""}
              titleKeyword={creators[key] + "\u0027s"}
              postTitle={"viewers also watch"}
            />
          </div>
        );
      });
    }
  }
  return (
    <div className={classes.HomeRecommended}>
      {gameTypeContent}
      {creatorContent}
    </div>
  );
};
const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
  };
};
export default connect(matchStateToProps)(HomeRecommended);
