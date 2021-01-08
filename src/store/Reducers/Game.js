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
  videoList: null,
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
    error: null,
    gameInitSuccess: true,
    videoList: action.videoList,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GAME_INIT_START:
      return gameInitStart(state, action);
    case actionTypes.GAME_INIT_SUCCESS:
      return gameInitSuccess(state, action);
    case actionTypes.GAME_INIT_FAIL:
      return state;
    default:
      return state;
  }
};

export default reducer;
