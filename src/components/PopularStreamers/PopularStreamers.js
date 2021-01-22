import React, { Component } from "react";
import classes from "./PopularStreamers.module.css";
import { db } from "../../firebase";
import StreamerList from "../StreamerList/StreamerList";

class PopularStreamers extends Component {
  state = {
    streamers: null,
  };
  componentDidMount() {
    let streamerList = [];
    db.collection("streamers")
      .limit(15)
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          streamerList.push(doc.data());
        });
        this.setState({ streamers: streamerList });
      });
  }
  render() {
    let PopularStreamers = (
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
        <div className={classes.DummyStreamer}>
          <div className={classes.DummyStreamerImg}>
            <div className={classes.ForAnimation}></div>
          </div>
          <div className={classes.DummyStreamerName}></div>
        </div>
      </div>
    );
    if (this.state.streamers) {
      const streamers = this.state.streamers;
      PopularStreamers = <StreamerList list={streamers.slice(0, 12)} />;
    }
    return (
      <div className={classes.PopularStreamersContainer}>
        <div className={classes.PopularStreamersHeader}>
          Popular <span>Streamers</span>
        </div>
        <div className={classes.PopularStreamers}>{PopularStreamers}</div>
      </div>
    );
  }
}

export default PopularStreamers;
