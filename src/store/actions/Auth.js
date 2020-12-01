import * as actionTypes from "./actionTypes";
import axios from "axios";
import { db, storage } from "../../firebase";

export const clearError = () => {
  return {
    type: actionTypes.CLEAR_ERROR,
  };
};

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START,
  };
};
export const authSuccess = (token, userId, expiresIn) => {
  const expirationTime = new Date(new Date().getTime() + expiresIn * 1000);
  console.log(expirationTime);
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
      dispatch(logout());
    }, expirationTime * 1000);
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
    dispatch(init(userPersonalData));
  };
};
export const init = (userPersonalData) => {
  return {
    type: actionTypes.CHECK_LOGIN_STATUS,
    profileURL: userPersonalData.profilePicURL,
    username: userPersonalData.username,
  };
};
