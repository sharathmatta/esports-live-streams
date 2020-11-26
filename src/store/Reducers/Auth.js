import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
  username: null,
  profileURL: null,
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
  });
};
const clearError = (state, action) => {
  return updateObject(state, { error: null });
};
const checkLoginStatus = (state, action) => {
  return updateObject(state, {
    profileURL: action.profileURL,
    username: action.username,
  });
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default reducer;
