import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  userId: null,
  username: null,
  profileURL: null,
  followercount: null,
  mainvideo: null,
  gamelist: null,
  uploads: null,
  socials: null,
  loading: false,
  following: false,
};

const profileInitSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    username: action.username,
    profileURL: action.profileURL,
    followercount: action.followercount,
    mainvideo: action.mainvideo,
    uploads: action.uploads,
    gamelist: action.gamelist,
    loading: false,
  });
};
const profileInitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_INIT_SUCCESS:
      return profileInitSuccess(state, action);
    case actionTypes.PROFILE_INIT_START:
      return profileInitStart(state, action);
    default:
      return state;
  }
};

export default reducer;
