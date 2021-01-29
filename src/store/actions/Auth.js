import * as actionTypes from "./actionTypes";
import axios from "axios";
import firebase, { db, storage } from "../../firebase";

const appInit = (allgames) => {
  return {
    type: actionTypes.INIT_APP,
    allgames: allgames,
  };
};

export const initializeApp = () => {
  return async (dispatch) => {
    let query = await db.collection("game").get();
    let allgames = [{ value: "", displayValue: "Game Category" }];
    query.forEach((el) => {
      allgames.push({
        value: el.id,
        displayValue: el.data().id,
      });
    });
    dispatch(appInit(allgames));
  };
};

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

export const showSignIn = () => {
  return {
    type: actionTypes.SHOW_SIGNIN,
  };
};

export const hideSignIn = () => {
  return {
    type: actionTypes.HIDE_SIGNIN,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId, expiresIn, signedUp) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expiresIn);
  localStorage.setItem("userId", userId);

  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
    signUpComplete: signedUp,
    loginComplete: !signedUp,
  };
};
export const uploadData = (userData) => {
  console.log(userData);
};
export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error: error,
  };
};

export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationTime");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const checkAuthTimeout = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      // dispatch(logout());
    }, expirationTime);
  };
};

export const auth = (userData, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = {
      email: userData.email,
      password: userData.password,
      returnSecureToken: true,
    };
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDB2yqIZv-6Em7nE9ZPc7D4QgvYNWSOsXc";

    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDB2yqIZv-6Em7nE9ZPc7D4QgvYNWSOsXc";
    }

    axios
      .post(url, authData)
      .then((response) => {
        if (isSignUp) {
          const uploadtask = storage
            .ref(`Profile Pictures/${userData.profilePic.name}`)
            .put(userData.profilePic);
          uploadtask.on(
            "state_changed",
            (snapshot) => {},
            (error) => {
              console.log(error);
            },

            () => {
              storage
                .ref("Profile Pictures")
                .child(userData.profilePic.name)
                .getDownloadURL()
                .then((url) => {
                  db.collection("streamers").doc(userData.username).set({
                    email: userData.email,
                    id: response.data.localId,
                    username: userData.username,
                    profilePicURL: url,
                    followercount: 0,
                    mainvideo: null,
                  });

                  dispatch(
                    authSuccess(
                      response.data.idToken,
                      response.data.localId,
                      response.data.expiresIn,
                      true
                    )
                  );
                });
            }
          );
        }
        if (!isSignUp) {
          dispatch(
            authSuccess(
              response.data.idToken,
              response.data.localId,
              response.data.expiresIn,
              false
            )
          );
        }
      })
      .catch((err) => {
        console.log(err.response.data.error);
        dispatch(authFail(err.response.data.error));
      });
  };
};

export const checkAuthState = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expiresIn = localStorage.getItem("expirationTime");
      const expirationTime = new Date(expiresIn);
      if (expirationTime < new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        dispatch(authSuccess(token, userId, expiresIn, false));
        dispatch(
          checkAuthTimeout(Math.round((expirationTime - new Date()) / 1000))
        );
      }
    }
  };
};

export const checkLoginStatus = (userId) => {
  return async (dispatch) => {
    let userPersonalData = null;
    let query = await db
      .collection("streamers")
      .where("id", "==", userId)
      .get();
    const snapshot = query.docs[0];
    userPersonalData = snapshot.data();
    const username = userPersonalData.username;
    query = await db
      .collection("streamers")
      .doc(username)
      .collection("following")
      .get();
    let following = [];
    query.forEach((el) => {
      following[el.id] = el.data();
    });
    if (following) {
      userPersonalData = {
        ...userPersonalData,
        following: following,
      };
    }
    query = await db
      .collection("streamers")
      .orderBy("followercount", "desc")
      .get();
    let recommended = [];
    query.forEach((el) => {
      const data = el.data();
      if (data.username !== username) {
        if (!(data.username in following)) {
          recommended[el.id] = el.data();
        }
      }
    });
    userPersonalData = {
      ...userPersonalData,
      recommended: recommended,
    };
    query = await db
      .collection("streamers")
      .doc(username)
      .collection("game-list")
      .get();
    let gamelist = [];
    if (query.size > 0) {
      query.forEach((el) => {
        gamelist.push(el.id);
      });
    } else {
      query = await db
        .collection("game")
        .orderBy("playercount", "desc")
        .limit(3)
        .get();
      query.forEach((el) => {
        gamelist.push(el.id);
      });
    }
    if (gamelist.length > 0) {
      userPersonalData = {
        ...userPersonalData,
        gamelist: gamelist,
      };
    }

    dispatch(init(userPersonalData));
  };
};
export const init = (userPersonalData) => {
  return {
    type: actionTypes.CHECK_LOGIN_STATUS,
    profileURL: userPersonalData.profilePicURL,
    username: userPersonalData.username,
    following: userPersonalData.following,
    recommended: userPersonalData.recommended,
    gamelist: userPersonalData.gamelist,
  };
};
const streamersFollowStart = () => {
  return {
    type: actionTypes.STREAMERS_FOLLOW_START,
  };
};

const streamersFollowSuccess = () => {
  return {
    type: actionTypes.STREAMERS_FOLLOW_SUCCESS,
  };
};
// const streamersFollowFail = () => {
//   return {
//     type: actionTypes.STREAMERS_FOLLOW_FAIL,
//   };
// };
export const skippedStreamers = () => {
  return {
    type: actionTypes.STREAMERS_FOLLOW_SUCCESS,
  };
};

export const initializeStreamerFollow = (user, streamers) => {
  return async (dispatch) => {
    dispatch(streamersFollowStart());
    let following = [];
    Object.keys(streamers).forEach(async (key) => {
      const streamer = streamers[key];
      let query = await db.collection("streamers").doc(streamer).get();
      const streamerData = query.data();
      query = await db
        .collection("streamers")
        .doc(user)
        .collection("following")
        .doc(streamer)
        .set(streamerData);

      following[streamer] = streamerData;
      const creatorRef = db.collection("streamers").doc(streamer);
      creatorRef.update({
        followercount: firebase.firestore.FieldValue.increment(1),
      });
    });

    let query = await db
      .collection("streamers")
      .orderBy("followercount", "desc")
      .get();

    let recommended = [];
    query.forEach((el) => {
      const data = el.data();
      if (data.username !== user) {
        if (!(data.username in following)) {
          recommended[el.id] = el.data();
        }
      }
    });
    dispatch(streamersFollowSuccess());
    dispatch(updateFollow(user));
  };
};

const gameFollowStart = () => {
  return {
    type: actionTypes.GAME_FOLLOW_START,
  };
};

const gameFollowSuccess = () => {
  return {
    type: actionTypes.GAME_FOLLOW_SUCCESS,
  };
};
// const gameFollowFail = () => {
//   return {
//     type: actionTypes.GAME_FOLLOW_FAIL,
//   };
// };
export const skippedGames = () => {
  return {
    type: actionTypes.GAME_FOLLOW_SUCCESS,
  };
};

export const initializeGameFollow = (user, games) => {
  return async (dispatch) => {
    dispatch(gameFollowStart());
    Object.keys(games).forEach(async (key) => {
      const game = games[key];
      let query = await db.collection("game").doc(game).get();
      const gameData = query.data();
      query = await db
        .collection("streamers")
        .doc(user)
        .collection("game-list")
        .doc(game)
        .set(gameData);
      const gameRef = db.collection("game").doc(game);
      gameRef.update({
        playercount: firebase.firestore.FieldValue.increment(1),
      });
    });
    dispatch(gameFollowSuccess());
  };
};

export const updateFollow = (user) => {
  return async (dispatch) => {
    let followData = null;
    let query = await db
      .collection("streamers")
      .doc(user)
      .collection("following")
      .get();

    let following = [];
    query.forEach((el) => {
      following[el.id] = el.data();
    });
    if (following) {
      followData = {
        ...followData,
        following: following,
      };
    }

    query = await db
      .collection("streamers")
      .orderBy("followercount", "desc")
      .get();
    let recommended = [];
    query.forEach((el) => {
      const data = el.data();
      if (data.username !== user) {
        if (!(data.username in following)) {
          recommended[el.id] = el.data();
        }
      }
    });
    followData = {
      ...followData,
      recommended: recommended,
    };
    dispatch(followUpdateSuccess(followData));
  };
};

const followUpdateSuccess = (followData) => {
  return {
    type: actionTypes.FOLLOW_UPDATE_SUCCESS,
    following: followData.following,
    recommended: followData.recommended,
  };
};
