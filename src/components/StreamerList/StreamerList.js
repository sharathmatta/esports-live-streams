import react from "react";
import StreamerBlock from "./StreamerBlock/StreamerBlock";
import classes from "./StreamerList.Module.css";

const streamerList = (props) => {
  let blocks = Object.keys(props.list).map((key) => {
    return (
      <StreamerBlock
        key={key}
        profilePic={props.list[key].profilePicURL}
        username={props.list[key].username}
      />
    );
  });
  return <div className={classes.StreamerList}>{blocks}</div>;
};

export default streamerList;
