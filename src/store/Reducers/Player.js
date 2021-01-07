import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {
  loading: false,
  videoURL: null,
  creator: null,
  title: null,
  desc: null,
  timestamp: null,
  error: null,
  moreVideosCreator: null,
  moreVideosGame: null,
  profilePicURL: null,
};

const playerInitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
    videoURL: null,
    title: null,
    creator: null,
    profilePicURL: null,
    desc: null,
    timestamp: null,

    error: null,
    moreVideosCreator: null,
    moreVideosGame: null,
  });
};
const playerInitSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    videoURL: action.videoURL,
    title: action.title,
    desc: action.desc,
    timestamp: action.timestamp,
    creator: action.creator,
    moreVideosCreator: action.moreVideos,
    moreVideosGame: action.moreVideos,
    profilePicURL: action.profilePicURL,
  });
};
const playerInitFail = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: action.error,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PLAYER_INIT_START:
      return playerInitStart(state, action);
    case actionTypes.PLAYER_INIT_SUCCESS:
      return playerInitSuccess(state, action);
    case actionTypes.PLAYER_INIT_FAIL:
      return playerInitFail(state, action);
    default:
      return state;
  }
};

export default reducer;
