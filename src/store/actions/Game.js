import * as actionTypes from "./actionTypes";
import { db } from "../../firebase";

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
    favVideolist: gameDetails.favVideolist,
    popVideolist: gameDetails.popVideolist,
  };
};

// const gameInitFail = () => {
//   return {
//     type: actionTypes.GAME_INIT_FAIL,
//   };
// };

export const initializeGame = (id, recommended, following) => {
  return async (dispatch) => {
    dispatch(gameInitStart());

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
    if (following) {
      dispatch(getList(gameId, following, "following"));
    }
    if (recommended) {
      dispatch(getList(gameId, recommended, "recommended"));
    } else {
      let recommendedList = {};
      let query = await db
        .collection("streamers")
        .orderBy("followercount", "desc")
        .get();
      query.forEach((el) => {
        recommendedList[el.id] = { ...el.data() };
      });
      dispatch(getList(gameId, recommendedList, "recommended"));
    }

    dispatch(gameInitSuccess(gameDetails));
  };
};

// const getStreamerDetails = async (username) => {
//   let query2 = await db.collection("streamers").doc(username).get();
//   console.log(query2.data());
//   return query2.data();
// };

const getList = (id, list, type) => {
  return async (dispatch) => {
    Object.keys(list).forEach((key) => {
      dispatch(checkPlaying(id, key, list[key], type));
    });
  };
};

const checkPlaying = (game, creator, data, type) => {
  return async (dispatch) => {
    let query = await db
      .collection("streamers")
      .doc(creator)
      .collection("game-list")
      .doc(game)
      .get();
    if (query.exists) {
      if (type === "following") {
        dispatch(addFavStreamer({ [creator]: data }));
        dispatch(checkVideos(game, creator, type));
      }
      if (type === "recommended") {
        dispatch(addPopStreamer({ [creator]: data }));
        dispatch(checkVideos(game, creator, type));
      }
    }
  };
};

const checkVideos = (game, creator, type) => {
  return async (dispatch) => {
    let query = await db
      .collection("game")
      .doc(game)
      .collection("videos")
      .where("creator", "==", creator)
      .get();
    if (query.size > 0) {
      let videos = [];
      query.forEach((el) => {
        videos.push({ id: el.id, ...el.data() });
      });
      if (type === "following") {
        dispatch(addFavStreamerVideos(creator, videos));
      }
      if (type === "recommended") {
        dispatch(addPopStreamerVideos(creator, videos));
      }
    }
  };
};

const addFavStreamer = (data) => {
  return {
    type: actionTypes.ADD_FAV_STREAMER,
    data: data,
  };
};
const addPopStreamer = (data) => {
  return {
    type: actionTypes.ADD_POP_STREAMER,
    data: data,
  };
};
const addFavStreamerVideos = (creator, videos) => {
  return {
    type: actionTypes.ADD_FAV_STREAMER_VIDEOS,
    creator: creator,
    videos: videos,
  };
};
const addPopStreamerVideos = (creator, videos) => {
  return {
    type: actionTypes.ADD_POP_STREAMER_VIDEOS,
    creator: creator,
    videos: videos,
  };
};
