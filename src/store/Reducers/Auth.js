import { retinaImage } from "polished";
import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  username: null,
  profileURL: null,
  showSignIn: false,
  following: null,
  recommended: null,
  gamelist: null,
  checkLogin: true,
  signUpComplete: false,
  loginComplete: false,
  allgames: null,
  appinit: false,
};

const authStart = (state, action) => {
  return updateObject(state, { error: null, loading: true });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    token: action.idToken,
    userId: action.userId,
    error: null,
    loading: false,
    loginChecked: false,
    signUpComplete: action.signUpComplete,
    checkLogin: !action.signUpComplete,
    loginComplete: action.loginComplete,
  });
};

const authFail = (state, action) => {
  return updateObject(state, {
    error: action.error,
    loading: false,
  });
};
const authLogout = (state, action) => {
  return updateObject(state, {
    token: null,
    userId: null,
    username: null,
    profileURL: null,
    following: null,
    recommended: null,
    gamelist: null,
    checkLogin: true,
    loginComplete: false,
    signUpComplete: false,
    strFollowProgress: false,
    streamersSelected: false,
    gamesSelected: false,
    loginChecked: false,
  });
};
const clearError = (state, action) => {
  return updateObject(state, { error: null });
};
const checkLoginStatus = (state, action) => {
  return updateObject(state, {
    profileURL: action.profileURL,
    username: action.username,
    following: action.following,
    recommended: action.recommended,
    gamelist: action.gamelist,
    loginChecked: true,
  });
};

const followUpdateSuccess = (state, action) => {
  return updateObject(state, {
    following: action.following,
    recommended: action.recommended,
  });
};

const showSignIn = (state, action) => {
  return updateObject(state, { showSignIn: true });
};
const hideSignIn = (state, action) => {
  return updateObject(state, { showSignIn: false });
};

const streamersFollowStart = (state, action) => {
  return updateObject(state, {
    strFollowProgress: true,
  });
};
const streamersFollowSuccess = (state, action) => {
  return updateObject(state, {
    strFollowProgress: false,
    streamersSelected: true,
  });
};

const streamersFollowFail = (state, action) => {
  return updateObject(state, {
    strFollowProgress: false,
    streamersSelected: true,
  });
};

const gamesFollowStart = (state, action) => {
  return updateObject(state, {
    strFollowProgress: true,
  });
};
const gamesFollowSuccess = (state, action) => {
  return updateObject(state, {
    strFollowProgress: false,
    gamesSelected: true,
    loginComplete: true,
  });
};

const gamesFollowFail = (state, action) => {
  return updateObject(state, {
    strFollowProgress: false,
    gamesSelected: true,
  });
};
const appInit = (state, action) => {
  return updateObject(state, { allgames: action.allgames, appinit: true });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.INIT_APP:
      return appInit(state, action);
    case actionTypes.SHOW_SIGNIN:
      return showSignIn(state, action);
    case actionTypes.HIDE_SIGNIN:
      return hideSignIn(state, action);
    case actionTypes.AUTH_START:
      return authStart(state, action);
    case actionTypes.AUTH_FAIL:
      return authFail(state, action);
    case actionTypes.AUTH_SUCCESS:
      return authSuccess(state, action);
    case actionTypes.AUTH_LOGOUT:
      return authLogout(state, action);
    case actionTypes.CLEAR_ERROR:
      return clearError(state, action);
    case actionTypes.CHECK_LOGIN_STATUS:
      return checkLoginStatus(state, action);
    case actionTypes.STREAMERS_FOLLOW_START:
      return streamersFollowStart(state, action);
    case actionTypes.STREAMERS_FOLLOW_SUCCESS:
      return streamersFollowSuccess(state, action);
    case actionTypes.STREAMERS_FOLLOW_FAIL:
      return streamersFollowFail(state, action);
    case actionTypes.GAME_FOLLOW_START:
      return gamesFollowStart(state, action);
    case actionTypes.GAME_FOLLOW_SUCCESS:
      return gamesFollowSuccess(state, action);
    case actionTypes.GAME_FOLLOW_FAIL:
      return gamesFollowFail(state, action);
    case actionTypes.FOLLOW_UPDATE_SUCCESS:
      return followUpdateSuccess(state, action);
    default:
      return state;
  }
};

export default reducer;
