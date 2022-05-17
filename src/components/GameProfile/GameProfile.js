import React, { useState, useEffect } from "react";

import { connect } from "react-redux";
import VideoList from "../../components/VideoList/VideoList";

import * as actions from "../../store/actions/index";
import Spinner from "../../ui/spinner/Spinner";
import StreamerList from "../StreamerList/StreamerList";
import classes from "./GameProfile.module.css";

const GameProfile = (props) => {
  const [gameId, setGameId] = useState(null);
  useEffect(() => {
    setGameId(props.match.params.gameid);
  }, [props.match.params.gameid]);
  useEffect(() => {
    if (gameId && props.loginChecked) {
      props.onGameInit(gameId, props.recommended, props.following);
    } else if (gameId && !props.token) {
      props.onGameInit(gameId, null, null);
    }
  }, [gameId, props.loginChecked]);
  useEffect(() => {
    if (props.gameDetails.favStreamers) {
      if (Object.keys(props.gameDetails.favStreamers).length > 0) {
      }
    }
    if (props.gameDetails.popStreamers) {
      if (Object.keys(props.gameDetails.popStreamers).length > 0) {
      }
    }
  }, [props.gameDetails.favStreamers, props.gameDetails.popStreamers]);

  useEffect(() => {}, [
    props.gameDetails.favVideolist,
    props.gameDetails.popVideolist,
  ]);

  let content = null;
  let FavouriteStreamers = null;
  let PopularStreamers = null;
  let favStreamersVideos = null;
  let popStreamersVideos = null;
  if (props.gameDetails.loading) {
    content = <Spinner />;
  }
  if (props.gameDetails.favStreamers) {
    let streamerList = props.gameDetails.favStreamers;
    if (Object.keys(streamerList).length > 0) {
      FavouriteStreamers = (
        <div className={classes.FavGameStreamerCont}>
          <div className={classes.Header}>
            Your favourite <span>{props.gameDetails.gamename}</span> streamers :
          </div>
          <div className={classes.StreamerList}>
            <StreamerList list={streamerList} />
          </div>
        </div>
      );
    }
  }
  if (props.gameDetails.favVideolist) {
    let favvideolist = props.gameDetails.favVideolist;
    if (Object.keys(favvideolist).length > 0) {
      favStreamersVideos = Object.keys(favvideolist).map((key) => {
        console.log(key);
        const list = favvideolist[key];
        return (
          <VideoList
            key={key}
            list={list}
            titleKeyword={key + "\u0027s " + props.gameDetails.gamename}
            postTitle={"videos"}
          />
        );
      });
    }
  }
  if (props.gameDetails.popVideolist) {
    let popvideolist = props.gameDetails.popVideolist;
    if (Object.keys(popvideolist).length > 0) {
      popStreamersVideos = Object.keys(popvideolist).map((key) => {
        console.log(key);
        const list = popvideolist[key];
        return (
          <VideoList
            key={key}
            list={list}
            titleKeyword={key + "\u0027s " + props.gameDetails.gamename}
            postTitle={"videos"}
          />
        );
      });
    }
  }
  if (props.gameDetails.popStreamers) {
    let streamerList = props.gameDetails.popStreamers;
    PopularStreamers = (
      <div className={classes.PopGameStreamerCont}>
        <div className={classes.Header}>
          Popular <span>{props.gameDetails.gamename}</span> streamers :
        </div>
        <div className={classes.StreamerList}>
          <StreamerList list={streamerList} />
        </div>
      </div>
    );
  }
  if (props.gameDetails.gamename) {
    content = (
      <div>
        {FavouriteStreamers}
        {favStreamersVideos}
        {PopularStreamers}
        {popStreamersVideos}
        <div className={classes.StreamerVideoList}>
          <VideoList
            preTitle={"Ninja\u0027s"}
            titleKeyword={props.gameDetails.gamename}
            postTitle={"videos"}
            list={props.gameDetails.videoList}
          />
        </div>
        <div className={classes.StreamerVideoList}>
          <VideoList
            preTitle={"BrookeAB\u0027s"}
            titleKeyword={props.gameDetails.gamename}
            postTitle={"videos"}
            list={props.gameDetails.videoList}
          />
        </div>
      </div>
    );
  }
  return <div className={classes.GameProfileContainer}>{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    token: state.auth.token,
    gameDetails: state.game,
    following: state.auth.following,
    recommended: state.auth.recommended,
    loginChecked: state.auth.loginChecked,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGameInit: (id, recommended, following) =>
      dispatch(actions.initializeGame(id, recommended, following)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameProfile);
