import React from "react";
import VideoList from "../VideoList/VideoList";
import { useState, useEffect } from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import classes from "./VideosRecommended.module.css";

const HomeRecommended = (props) => {
  const [creatorVideos, setCreatorVideos] = useState(null);
  const [gameVideos, setGameVideos] = useState(null);
  const [recommended, setRecommended] = useState(null);
  const [gamelist, setGamelist] = useState(null);
  useEffect(() => {
    const getVideosRecommended = async () => {
      if (props.token) {
        setRecommended(props.recommended);
        setGamelist(props.gamelist);
      } else {
        let query = await db
          .collection("streamers")
          .orderBy("followercount", "desc")
          .get();
        let recom = [];

        query.forEach((el) => {
          recom[el.id] = { ...el.data() };
        });

        setRecommended(recom);

        query = await db
          .collection("game")
          .orderBy("playercount", "desc")
          .limit(10)
          .get();
        let games = [];
        query.forEach((el) => {
          games.push(el.id);
        });
        setGamelist(games);
      }
    };
    getVideosRecommended();
  }, [props.recommended, props.gamelist]);
  useEffect(() => {
    let vidCollection = [];
    if (recommended && gamelist) {
      Object.keys(recommended).forEach(async (key) => {
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
          vidCollection[key] = videoCollection;
          setCreatorVideos((oldObj) => {
            let newObj = { ...oldObj };
            newObj = { ...newObj, [key]: videoCollection };
            return newObj;
          });
        }
      });
      Object.keys(gamelist).forEach(async (key) => {
        let query = await db
          .collection("game")
          .doc(gamelist[key])
          .collection("videos")
          .get();
        let videoCollection = [];
        query.forEach((el) => {
          videoCollection.push({ id: el.id, ...el.data() });
        });
        if (videoCollection.length > 0) {
          vidCollection[gamelist[key]] = videoCollection;
          setGameVideos((oldObj) => {
            let newObj = { ...oldObj };
            newObj = { ...newObj, [gamelist[key]]: videoCollection };
            return newObj;
          });
        }
      });
    }
  }, [recommended, gamelist]);

  let gameTypeContent = null;
  let creatorContent = null;
  if (gameVideos) {
    gameTypeContent = Object.keys(gameVideos).map((key) => {
      return (
        <div className={classes.CreatorVideoList} key={key}>
          <VideoList
            list={gameVideos[key]}
            preTitle={"Recommended"}
            titleKeyword={key}
            postTitle={"videos"}
          />
        </div>
      );
    });
  }
  if (creatorVideos) {
    creatorContent = Object.keys(creatorVideos).map((key) => {
      return (
        <div className={classes.CreatorVideoList} key={key}>
          <VideoList
            list={creatorVideos[key]}
            preTitle={"Recommended"}
            titleKeyword={key + "\u0027s"}
            postTitle={"videos"}
          />
        </div>
      );
    });
    if (props.token) {
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
    recommended: state.auth.recommended,
    gamelist: state.auth.gamelist,
  };
};
export default connect(matchStateToProps)(HomeRecommended);
