import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  loading: null,
  gameId: null,
  gamename: null,
  gameLogo: null,
  favStreamers: null,
  popStreamers: null,
  error: null,
  favVideolist: null,
  popVideolist: null,
  gameInitSuccess: null,
};

const gameInitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    gameId: null,
    gamename: null,
    gameLogo: null,
    favStreamers: null,
    popStreamers: null,
    error: null,
    gameInitSuccess: null,
    favVideolist: null,
    popVideolist: null,
    videoList: null,
  });
};
const gameInitSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    gameId: action.gameId,
    gamename: action.gamename,
    gameLogo: action.gameLogo,
    favStreamers: action.favStreamers,
    popStreamers: action.popStreamers,
    favVideolist: action.favVideolist,
    popVideolist: action.popVideolist,
    error: null,
    gameInitSuccess: true,
    videoList: action.videoList,
  });
};

const addFavStreamer = (state, action) => {
  return updateObject(state, {
    favStreamers: {
      ...state.favStreamers,
      ...action.data,
    },
  });
};
const addPopStreamer = (state, action) => {
  return updateObject(state, {
    popStreamers: {
      ...state.popStreamers,
      ...action.data,
    },
  });
};

const addFavStreamerVideos = (state, action) => {
  return updateObject(state, {
    favVideolist: {
      ...state.favVideolist,
      [action.creator]: action.videos,
    },
  });
};

const addPopStreamerVideos = (state, action) => {
  return updateObject(state, {
    popVideolist: {
      ...state.popVideolist,
      [action.creator]: action.videos,
    },
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_INIT_START:
      return gameInitStart(state, action);
    case actionTypes.GAME_INIT_SUCCESS:
      return gameInitSuccess(state, action);
    case actionTypes.ADD_FAV_STREAMER:
      return addFavStreamer(state, action);
    case actionTypes.ADD_POP_STREAMER:
      return addPopStreamer(state, action);
    case actionTypes.ADD_FAV_STREAMER_VIDEOS:
      return addFavStreamerVideos(state, action);
    case actionTypes.ADD_POP_STREAMER_VIDEOS:
      return addPopStreamerVideos(state, action);
    case actionTypes.GAME_INIT_FAIL:
      return state;
    default:
      return state;
  }
};

export default reducer;
