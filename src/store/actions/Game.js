import * as actionTypes from "./actionTypes";
import axios from "axios";
import { db, storage } from "../../firebase";

const gameInitStart = () => {
  return {
    type: actionTypes.GAME_INIT_START,
  };
};

const gameInitSuccess = (gameDetails) => {
  return {
    type: actionTypes.GAME_INIT_SUCCESS,
    gameId: gameDetails.gameId,
    gamename: gameDetails.gamename,
    gameLogo: gameDetails.gameLogo,
    favStreamers: gameDetails.favStreamers,
    popStreamers: gameDetails.popStreamers,
    videoList: gameDetails.videoList,
  };
};

const gameInitFail = () => {
  return {
    type: actionTypes.GAME_INIT_FAIL,
  };
};

export const initializeGame = (id, favStreamers, popStreamers) => {
  return async (dispatch) => {
    dispatch(gameInitStart());
    console.log(id);
    let gameDetails = {};

    let query = await db.collection("game").doc(id).get();
    const gameId = id;
    const gamename = query.data().id;
    const gameLogo = query.data().logo;
    gameDetails = {
      ...gameDetails,
      gameId: gameId,
      gamename: gamename,
      gameLogo: gameLogo,
    };
    let favStreamersList = [];
    for (let i = 0; i < favStreamers.length; i++) {
      let strName = favStreamers[i];
      query = await db.collection("popular-streamers").doc(strName).get();
      favStreamersList[strName] = query.data();
      gameDetails = {
        ...gameDetails,
        favStreamers: {
          ...favStreamersList,
        },
      };
    }
    let popStreamersList = [];
    for (let i = 0; i < popStreamers.length; i++) {
      let strName = popStreamers[i];
      query = await db.collection("popular-streamers").doc(strName).get();
      popStreamersList[strName] = query.data();
      gameDetails = {
        ...gameDetails,
        popStreamers: {
          ...popStreamersList,
        },
      };
    }
    query = await db
      .collection("video-uploads")
      .orderBy("timestamp", "desc")
      .get();
    let videos = [];

    query.forEach((element) => {
      let vidData = null;
      vidData = { ...element.data(), id: element.id };
      videos.push(vidData);
    });
    gameDetails = {
      ...gameDetails,
      videoList: videos,
    };
    dispatch(gameInitSuccess(gameDetails));
  };
};
