import * as actionTypes from "./actionTypes";
import { db } from "../../firebase";

export const profileInitSuccess = (streamerData) => {
  return {
    type: actionTypes.PROFILE_INIT_SUCCESS,
    followercount: streamerData.followercount,
    mainvideo: streamerData.mainvideo,
    uploads: streamerData.uploads,
    gamelist: streamerData.gamelist,
    username: streamerData.username,
    userId: streamerData.userId,
    profileURL: streamerData.profileURL,
  };
};
export const profileInitStart = () => {
  return {
    type: actionTypes.PROFILE_INIT_START,
  };
};
export const initializeProfile = (username) => {
  return async (dispatch) => {
    dispatch(profileInitStart());
    let streamerData = null;
    let query = await db.collection("streamers").doc(username).get();
    let snapshot = query.data();
    streamerData = {
      userId: snapshot.id,
      followercount: snapshot.followercount,
      mainvideo: snapshot.mainvideo,
      profileURL: snapshot.profilePicURL,
      username: snapshot.username,
    };
    query = await db
      .collection("streamers")
      .doc(username)
      .collection("past-broadcasts")
      .get();
    let pastbroadcasts = [];
    query.forEach((element) => {
      pastbroadcasts.push(element.data());
    });
    query = await db
      .collection("streamers")
      .doc("Sharath")
      .collection("clips")
      .get();
    let uploads = [];
    query.forEach((element) => {
      uploads.push(element.data());
    });
    query = await db
      .collection("streamers")
      .doc(username)
      .collection("game-list")
      .get();
    let gameList = [];
    query.forEach((element) => {
      gameList.push(element.data());
    });
    streamerData = {
      ...streamerData,
      pastbroadcasts: pastbroadcasts,
      uploads: uploads,
      gamelist: gameList,
    };
    dispatch(profileInitSuccess(streamerData));
  };
};
