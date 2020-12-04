import * as actionTypes from "./actionTypes";
import { db } from "../../firebase";

export const profileInit = (streamerData) => {
  return {
    type: actionTypes.PROFILE_INIT,
    followercount: streamerData.followercount,
    mainvideo: streamerData.mainvideo,
    pastbroadcasts: streamerData.pastbroadcasts,
    clips: streamerData.clips,
    gamelist: streamerData.gamelist,
  };
};

// export const initializeProfile = (username) => {
//   return (dispatch) => {
//     let streamerData = null;
//     db.collection("streamers")
//       .doc(username)
//       .get()
//       .then((snapshot) => {
//         const data = snapshot.data();
//         console.log(snapshot.data().followercount);
//         streamerData = {
//           ...streamerData,
//           followercount: data.followercount,
//           mainvideo: data.mainvideo,
//         };
//         let pastBroadcasts = [];
//         db.collection("streamers")
//           .doc(username)
//           .collection("past-broadcasts")
//           .get()
//           .then((snapshot) => {
//             snapshot.forEach((doc) => {
//               pastBroadcasts.push(doc.data().link);
//             });
//             streamerData = {
//               ...streamerData,
//               pastbroadcasts: pastBroadcasts,
//             };
//             dispatch(profileInit(streamerData));
//           });
//       });\
//   };
// };
export const initializeProfile = (username) => {
  return async (dispatch) => {
    let streamerData = null;
    let query = await db.collection("streamers").doc(username).get();
    let snapshot = query.data();
    streamerData = {
      followercount: snapshot.followercount,
      mainvideo: snapshot.mainvideo,
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
      .doc(username)
      .collection("clips")
      .get();
    let clips = [];
    query.forEach((element) => {
      clips.push(element.data());
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
      clips: clips,
      gamelist: gameList,
    };
    dispatch(profileInit(streamerData));
  };
};
