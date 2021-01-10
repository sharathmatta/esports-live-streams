import React, { Component } from "react";
import classes from "./PopularStreamers.module.css";
import blankStreamer from "../../assets/—Pngtree—profile glyph black icon_4008321.png";
import { NavLink } from "react-router-dom";

import { db } from "../../firebase";

class PopularStreamers extends Component {
  state = {
    streamers: null,
  };
  componentDidMount() {
    let streamerList = [];
    db.collection("popular-streamers")
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
      PopularStreamers = Object.keys(this.state.streamers).map((key) => {
        return (
          <NavLink
            to={"/profile/" + streamers[key].username}
            key={streamers[key].username}
          >
            <div className={classes.Streamer}>
              <img
                src={streamers[key].profilePicURL}
                alt="streamerlogo"
                onError={(e) => {
                  e.target.src = blankStreamer;
                }}
              />
            </div>
            <span>{streamers[key].username}</span>
          </NavLink>
        );
      });
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
