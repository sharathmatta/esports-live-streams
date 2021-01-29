import * as actionTypes from "./actionTypes";
import firebase, { db } from "../../firebase";
import * as actions from "./index";

export const profileInitSuccess = (streamerData) => {
  return {
    type: actionTypes.PROFILE_INIT_SUCCESS,
    followercount: streamerData.followercount,
    mainvideo: streamerData.mainvideo,
    mainvideoId: streamerData.mainvideoId,
    uploads: streamerData.uploads,
    gamelist: streamerData.gamelist,
    username: streamerData.username,
    userId: streamerData.userId,
    profileURL: streamerData.profileURL,
    following: streamerData.following,
  };
};
export const profileInitStart = () => {
  return {
    type: actionTypes.PROFILE_INIT_START,
  };
};
export const initializeProfile = (user, creator) => {
  return async (dispatch) => {
    dispatch(profileInitStart());
    let streamerData = null;
    let query = await db.collection("streamers").doc(creator).get();
    let snapshot = query.data();
    streamerData = {
      userId: snapshot.id,
      followercount: snapshot.followercount,

      mainvideo: snapshot.mainvideo,
      mainvideoId: snapshot.mainvideoId,
      profileURL: snapshot.profilePicURL,
      username: snapshot.username,
    };
    // query = await db
    //   .collection("streamers")
    //   .doc(username)
    //   .collection("past-broadcasts")
    //   .get();
    // let pastbroadcasts = [];
    // query.forEach((element) => {
    //   pastbroadcasts.push(element.data());
    // });
    query = await db
      .collection("streamers")
      .doc(creator)
      .collection("video-uploads")
      .orderBy("timestamp", "desc")
      .get();
    let uploads = [];

    query.forEach((element) => {
      let vidData = null;
      vidData = { ...element.data(), id: element.id };
      uploads.push(vidData);
    });
    if (uploads.length > 0) {
      streamerData = {
        ...streamerData,

        uploads: uploads,
      };
    }
    query = await db
      .collection("streamers")
      .doc(creator)
      .collection("game-list")
      .get();
    let gameList = [];
    query.forEach((element) => {
      gameList[element.id] = element.data();
    });
    let following = false;
    if (user) {
      query = await db
        .collection("streamers")
        .doc(user)
        .collection("following")
        .doc(creator)
        .get();
      if (query.data()) {
        following = true;
      }
    }

    streamerData = {
      ...streamerData,
      gamelist: gameList,
      following: following,
    };
    dispatch(profileInitSuccess(streamerData));
  };
};

export const unfollowInit = () => {
  return {
    type: actionTypes.UNFOLLOW_INIT,
  };
};

export const unfollowSuccess = () => {
  return {
    type: actionTypes.UNFOLLOW_SUCCESS,
  };
};

export const unfollowFail = () => {
  return {
    type: actionTypes.FOLLOW_FAIL,
  };
};

export const followInit = () => {
  return {
    type: actionTypes.FOLLOW_INIT,
    followloading: true,
  };
};

export const followSuccess = () => {
  return {
    type: actionTypes.FOLLOW_SUCCESS,
    followloading: false,
    following: true,
  };
};

export const followFail = () => {
  return {
    type: actionTypes.FOLLOW_FAIL,
    followloading: false,
  };
};

export const initializeUnfollow = (user, creator) => {
  return async (dispatch) => {
    dispatch(unfollowInit());
    let query = await db
      .collection("streamers")
      .doc(user)
      .collection("following")
      .doc(creator)
      .delete();
    const creatorRef = db.collection("streamers").doc(creator);
    await creatorRef.update({
      followercount: firebase.firestore.FieldValue.increment(-1),
    });

    dispatch(unfollowSuccess());
    dispatch(actions.updateFollow(user));
  };
};
export const initializeFollow = (user, creator) => {
  return async (dispatch) => {
    dispatch(followInit());
    let creatordata = null;
    let query = await db.collection("streamers").doc(creator).get();
    creatordata = query.data();
    query = await db
      .collection("streamers")
      .doc(user)
      .collection("following")
      .doc(creator)
      .set(creatordata);
    const creatorRef = db.collection("streamers").doc(creator);
    await creatorRef.update({
      followercount: firebase.firestore.FieldValue.increment(1),
    });
    dispatch(followSuccess());
    dispatch(actions.updateFollow(user));
  };
};

export const initializeUpdateVideos = (user) => {
  return async (dispatch) => {
    let query = await db
      .collection("streamers")
      .doc(user)
      .collection("video-uploads")
      .orderBy("timestamp", "desc")
      .get();
    let uploads = [];
    query.forEach((el) => {
      uploads.push({ id: el.id, ...el.data() });
    });
    dispatch(updateVideos(uploads));
  };
};

const updateVideos = (uploads) => {
  return {
    type: actionTypes.UPDATE_VIDEOS,
    uploads: uploads,
  };
};
