import react, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { db } from "../../firebase";
import recommended from "../Recommended/Recommended";
import StreamerList from "../StreamerList/StreamerList";
import classes from "./StreamersRecommended.module.css";

const StreamersRecommended = (props) => {
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
  const [recommended, setRecommended] = useState(null);
  useEffect(async () => {
    if (props.token) {
      setRecommended(props.recommended);
    } else {
      let query = await db
        .collection("streamers")
        .orderBy("followercount", "desc")
        .get();
      let recom = [];
      query.forEach((el) => {
        recom.push({ id: el.id, ...el.data() });
      });
      setRecommended(recom);
    }
  }, [props.recommended]);
  if (recommended) {
    content = (
      <div className={classes.StreamerList}>
        <StreamerList list={recommended} />
      </div>
    );
  }

  return (
    <div className={classes.RecommendedStreamers}>
      <div className={classes.StreamerListHeader}>
        Recommended <span>Streamers</span>
      </div>
      {content}
    </div>
  );
};
const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    loginChecked: state.auth.loginChecked,
    recommended: state.auth.recommended,
  };
};
export default connect(matchStateToProps)(StreamersRecommended);
