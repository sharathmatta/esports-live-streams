import react from "react";
import { connect } from "react-redux";
import StreamerList from "../StreamerList/StreamerList";
import classes from "./StreamersFollowing.Module.css";

const StreamersFollowing = (props) => {
  let content = (
    <div className={classes.DummyList}>
      <div className={classes.DummyStreamer}>
        <div className={classes.DummyStreamerImg}>
          <div className={classes.ForAnimation}></div>
        </div>
        <div className={classes.DummyStreamerName}></div>
      </div>
      <div className={classes.DummyStreamer}>
        <div className={classes.DummyStreamerImg}>
          <div className={classes.ForAnimation}></div>
        </div>
        <div className={classes.DummyStreamerName}></div>
      </div>
      <div className={classes.DummyStreamer}>
        <div className={classes.DummyStreamerImg}>
          <div className={classes.ForAnimation}></div>
        </div>
        <div className={classes.DummyStreamerName}></div>
      </div>
      <div className={classes.DummyStreamer}>
        <div className={classes.DummyStreamerImg}>
          <div className={classes.ForAnimation}></div>
        </div>
        <div className={classes.DummyStreamerName}></div>
      </div>
      <div className={classes.DummyStreamer}>
        <div className={classes.DummyStreamerImg}>
          <div className={classes.ForAnimation}></div>
        </div>
        <div className={classes.DummyStreamerName}></div>
      </div>
      <div className={classes.DummyStreamer}>
        <div className={classes.DummyStreamerImg}>
          <div className={classes.ForAnimation}></div>
        </div>
        <div className={classes.DummyStreamerName}></div>
      </div>
    </div>
  );
  if (props.loginChecked) {
    content = (
      <div className={classes.StreamerList}>
        <StreamerList list={props.following} />
      </div>
    );
  }

  return (
    <div className={classes.FollowingStreamers}>
      <div className={classes.StreamerListHeader}>
        <span>Streamers</span> you follow :
      </div>
      {content}
    </div>
  );
};
const matchStateToProps = (state) => {
  return {
    loginChecked: state.auth.loginChecked,
    following: state.auth.following,
  };
};
export default connect(matchStateToProps)(StreamersFollowing);
