const getHighlights = (link) => {};
const getPastBroadcast = (link) => {};
const getClip = (link) => {};

export const initializePlayer = (type, link) => {
  return (dispatch) => {
    switch (type) {
      case "highlights":
        dispatch(getHighlights(link));
        break;
      case "past-broadcasts":
        dispatch(getPastBroadcast(link));
        break;
      case "clips":
        dispatch(getClip(link));
        break;
      default:
        break;
    }
  };
};
