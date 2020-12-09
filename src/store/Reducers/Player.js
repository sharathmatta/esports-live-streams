import { updateObject } from "../utility";
import * as actionTypes from "../actions/actionTypes";

const initialState = {};

const playerInitStart = (state, action) => {
  return updateObject(state, {});
};
const playerInitSuccess = (state, action) => {
  return updateObject(state, {});
};
const playerInitFail = (state, action) => {
  return updateObject(state, {});
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
