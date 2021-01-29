import StreamerBlock from "./StreamerBlock/StreamerBlock";
import classes from "./StreamerList.Module.css";

const streamerList = (props) => {
  let blocks = null;
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  blocks = Object.keys(arr).map((key) => {
    return <StreamerBlock key={key} />;
  });
  const list = { ...props.list };
  if (list) {
    if (Object.keys(list).length > 0) {
      blocks = Object.keys(list).map((key) => {
        return (
          <StreamerBlock
            key={key}
            profilePic={list[key].profilePicURL}
            username={list[key].username}
          />
        );
      });
    }
  }
  return <div className={classes.StreamerList}>{blocks}</div>;
};

export default streamerList;
