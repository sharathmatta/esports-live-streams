import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  userId: null,
  username: null,
  profileURL: null,
  followercount: null,
  mainvideo: null,
  mainVideoId: null,
  gamelist: null,
  uploads: null,
  socials: null,
  loading: false,
  following: false,
  followloading: false,
};

const profileInitSuccess = (state, action) => {
  return updateObject(state, {
    userId: action.userId,
    username: action.username,
    profileURL: action.profileURL,
    followercount: action.followercount,
    mainvideo: action.mainvideo,
    mainvideoId: action.mainvideoId,
    uploads: action.uploads,
    gamelist: action.gamelist,
    loading: false,
    following: action.following,
  });
};
const profileInitStart = (state, action) => {
  return updateObject(state, {
    loading: true,
  });
};
const unfollowInit = (state, action) => {
  return updateObject(state, {
    followloading: true,
  });
};
const unfollowSuccess = (state, action) => {
  return updateObject(state, {
    followloading: false,
    following: false,
    followercount: state.followercount - 1,
  });
};
const followInit = (state, action) => {
  return updateObject(state, {
    followloading: true,
  });
};
const followSuccess = (state, action) => {
  return updateObject(state, {
    followloading: false,
    following: true,
    followercount: state.followercount + 1,
  });
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.PROFILE_INIT_SUCCESS:
      return profileInitSuccess(state, action);
    case actionTypes.PROFILE_INIT_START:
      return profileInitStart(state, action);
    case actionTypes.UNFOLLOW_INIT:
      return unfollowInit(state, action);
    case actionTypes.UNFOLLOW_SUCCESS:
      return unfollowSuccess(state, action);
    case actionTypes.FOLLOW_INIT:
      return followInit(state, action);
    case actionTypes.FOLLOW_SUCCESS:
      return followSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
