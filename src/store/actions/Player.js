import { db } from "../../firebase";
import * as actionTypes from "./actionTypes";

const playerInitStart = () => {
  return {
    type: actionTypes.PLAYER_INIT_START,
  };
};
const playerInitSuccess = (videoData, moreVideos, profilePicURL) => {
  return {
    type: actionTypes.PLAYER_INIT_SUCCESS,
    videoURL: videoData.videoURL,
    creator: videoData.creator,
    desc: videoData.desc,
    title: videoData.title,
    timestamp: videoData.timestamp,
    moreVideos: moreVideos,
    profilePicURL: profilePicURL,
  };
};

const getHighlights = (id) => {};

const getVideo = (creator, id) => {
  return async (dispatch) => {
    let videoData = null;
    let query = await db.collection("video-uploads").doc(id).get();
    videoData = { ...query.data() };
    query = await db.collection("video-uploads").get();
    let moreVideos = [];
    query.forEach((el) => {
      if (el.id !== id) {
        const vidData = { ...el.data(), id: el.id };

        moreVideos.push(vidData);
      }
    });
    console.log(creator);
    query = await db.collection("streamers").doc(creator).get();
    console.log(query.data());
    const profilePicURL = query.data().profilePicURL;
    dispatch(playerInitSuccess(videoData, moreVideos, profilePicURL));
  };
};

export const initializePlayer = (creator, type, id) => {
  return (dispatch) => {
    dispatch(playerInitStart());
    switch (type) {
      case "highlights":
        //dispatch(getHighlights(id));
        break;
      case "watch":
        console.log(creator);
        dispatch(getVideo(creator, id));
        break;
      default:
        break;
    }
  };
};
