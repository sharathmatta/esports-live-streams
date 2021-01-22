import { db } from "../../firebase";
import * as actionTypes from "./actionTypes";

const playerInitStart = () => {
  return {
    type: actionTypes.PLAYER_INIT_START,
  };
};
const playerInitSuccess = (
  videoData,
  moreVideosCreator,
  moreVideosGame,
  profilePicURL
) => {
  return {
    type: actionTypes.PLAYER_INIT_SUCCESS,
    videoURL: videoData.videoURL,
    creator: videoData.creator,
    desc: videoData.desc,
    title: videoData.title,
    game: videoData.game,
    timestamp: videoData.timestamp,
    moreVideosCreator: moreVideosCreator,
    moreVideosGame: moreVideosGame,
    profilePicURL: profilePicURL,
  };
};

const getHighlights = (creator) => {
  return async (dispatch) => {
    let query = await db.collection("streamers").doc(creator).get();
    console.log(query.data());
  };
};

const getVideo = (creator, id) => {
  return async (dispatch) => {
    let videoData = null;
    let query = await db
      .collection("streamers")
      .doc(creator)
      .collection("video-uploads")
      .doc(id)
      .get();

    videoData = { ...query.data() };
    console.log(videoData);
    query = await db
      .collection("streamers")
      .doc(creator)
      .collection("video-uploads")
      .get();
    let moreVideosCreator = [];
    query.forEach((el) => {
      if (el.id !== id) {
        const vidData = { ...el.data(), id: el.id };

        moreVideosCreator.push(vidData);
      }
    });
    query = await db
      .collection("game")
      .doc(videoData.game)
      .collection("videos")
      .orderBy("timestamp", "desc")
      .get();
    let moreVideosGame = [];
    query.forEach((el) => {
      if (el.id !== id) {
        const vidData = { ...el.data(), id: el.id };
        moreVideosGame.push(vidData);
      }
    });
    query = await db.collection("streamers").doc(creator).get();
    const profilePicURL = query.data().profilePicURL;
    dispatch(
      playerInitSuccess(
        videoData,
        moreVideosCreator,
        moreVideosGame,
        profilePicURL
      )
    );
  };
};

export const initializePlayer = (creator, type, id) => {
  return (dispatch) => {
    dispatch(playerInitStart());
    switch (type) {
      case "highlights":
        dispatch(getHighlights(creator));
        break;
      case "watch":
        dispatch(getVideo(creator, id));
        break;
      default:
        break;
    }
  };
};
