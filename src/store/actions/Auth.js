import * as actionTypes from "./actionTypes";
import axios from "axios";
import { db, storage } from "../../firebase";

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
export const authSuccess = (token, userId, expiresIn) => {
  localStorage.setItem("token", token);
  localStorage.setItem("expirationTime", expiresIn);
  localStorage.setItem("userId", userId);

  return {
    type: actionTypes.AUTH_SUCCESS,
    idToken: token,
    userId: userId,
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
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA62an2yCTIIw8oXRrUfxrrK1HG_nthqnk";

    if (!isSignUp) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA62an2yCTIIw8oXRrUfxrrK1HG_nthqnk";
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
                    mainvideo:
                      "https://firebasestorage.googleapis.com/v0/b/esports-live-streams.appspot.com/o/Main%20Video%2FSelena%20Gomez%20-%20Feel%20Me%20(Live%20from%20the%20Revival%20Tour)_8N_Yro5QeCE_1080p.mp4?alt=media&token=ffc37414-6812-4ca1-9352-ed3ae427b44b",
                  });

                  dispatch(
                    authSuccess(
                      response.data.idToken,
                      response.data.localId,
                      response.data.expiresIn
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
              response.data.expiresIn
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
        dispatch(authSuccess(token, userId, expiresIn));
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
      following.push(el.data());
    });
    if (following.length > 0) {
      userPersonalData = {
        ...userPersonalData,
        following: following,
      };
    }
    query = await db
      .collection("streamers")
      .doc("Sharath")
      .collection("recommende")
      .get();
    let recommended = [];
    query.forEach((el) => {
      recommended.push(el.data());
    });
    userPersonalData = {
      ...userPersonalData,
      recommended: recommended,
    };
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
  };
};
