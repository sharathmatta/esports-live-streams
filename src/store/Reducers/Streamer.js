import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  followercount: null,
  mainvideo: null,
  gamelist: null,
  pastbroadcasts: null,
  clips: null,
  socials: null,
};

const profileInit = (state, action) => {
  return updateObject(state, {
    followercount: action.followercount,
    mainvideo: action.mainvideo,
    pastbroadcasts: action.pastbroadcasts,
    clips: action.clips,
    gamelist: action.gamelist,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_INIT:
      return profileInit(state, action);
    default:
      return state;
  }
};

export default reducer;
