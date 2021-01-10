import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { db } from "../../firebase";
import { connect } from "react-redux";
import VideoList from "../../components/VideoList/VideoList";
import blankStreamer from "../../assets/—Pngtree—profile glyph black icon_4008321.png";
import * as actions from "../../store/actions/index";
import Spinner from "../../ui/spinner/Spinner";
import classes from "./GameProfile.module.css";

const GameProfile = (props) => {
  const [gameId, setGameId] = useState(null);
  const [favGameStreamer, setFavGameStreamer] = useState([
    "Ninja",
    "Myth",
    "Brookeab",
  ]);
  const [popGameStreamer, setPopGameStreamer] = useState([
    "Mrsavage",
    "Bugha",
    "Sharath",
    "Cloakzy",
  ]);
  const [favList, setFavList] = useState(null);
  useEffect(() => {
    setGameId(props.match.params.gameid);
    if (gameId) {
      props.onGameInit(gameId, favGameStreamer, popGameStreamer);
    }
  }, [props.match.params.gameid, gameId]);
  const FavGameStreamers = <div></div>;
  let content = null;
  let FavouriteStreamers = null;
  let PopularStreamers = null;

  if (props.gameDetails.loading) {
    content = <Spinner />;
  }
  if (props.gameDetails.favStreamers && props.gameDetails.popStreamers) {
    let streamerList = props.gameDetails.favStreamers;

    FavouriteStreamers = Object.keys(streamerList).map((key) => {
      return (
        <NavLink
          to={"/profile/" + streamerList[key].username}
          key={streamerList[key].username}
        >
          <div className={classes.Streamer}>
            <img
              src={streamerList[key].profilePicURL}
              alt="streamerlogo"
              onError={(e) => {
                e.target.src = blankStreamer;
              }}
            />
          </div>
          <span>{streamerList[key].username}</span>
        </NavLink>
      );
    });
    streamerList = props.gameDetails.popStreamers;
    PopularStreamers = Object.keys(streamerList).map((key) => {
      return (
        <NavLink
          to={"/profile/" + streamerList[key].username}
          key={streamerList[key].username}
        >
          <div className={classes.Streamer}>
            <img
              src={streamerList[key].profilePicURL}
              alt="streamerlogo"
              onError={(e) => {
                e.target.src = blankStreamer;
              }}
            />
          </div>
          <span>{streamerList[key].username}</span>
        </NavLink>
      );
    });
  }
  if (props.gameDetails.gamename) {
    content = (
      <div>
        <div className={classes.FavGameStreamerCont}>
          <div className={classes.Header}>
            Your favourite <span>{props.gameDetails.gamename}</span> streamers :
          </div>
          <div className={classes.StreamerList}>{FavouriteStreamers}</div>
        </div>
        <div className={classes.PopGameStreamerCont}>
          <div className={classes.Header}>
            Popular <span>{props.gameDetails.gamename}</span> streamers :
          </div>
          <div className={classes.StreamerList}>{PopularStreamers}</div>
        </div>
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
    gameDetails: state.game,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onGameInit: (id, favGameStreamer, popGameStreamer) =>
      dispatch(actions.initializeGame(id, favGameStreamer, popGameStreamer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GameProfile);
