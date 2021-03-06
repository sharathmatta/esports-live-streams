import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import App from "./containers/App";
import reportWebVitals from "./reportWebVitals";
import authReducer from "./store/Reducers/Auth";
import playerReducer from "./store/Reducers/Player";
import streamerReducer from "./store/Reducers/Streamer";
import gameReducer from "./store/Reducers/Game";

const rootReducer = combineReducers({
  auth: authReducer,
  streamer: streamerReducer,
  player: playerReducer,
  game: gameReducer,
});
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

//
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
