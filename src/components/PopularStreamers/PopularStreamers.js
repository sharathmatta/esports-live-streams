import React, { Component } from "react";
import classes from "./PopularStreamers.module.css";
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
    let PopularStreamers = null;
    if (this.state.streamers) {
      const streamers = this.state.streamers;
      PopularStreamers = Object.keys(this.state.streamers).map((key) => {
        return (
          <NavLink to="/" key={streamers[key].username}>
            <div className={classes.Streamer}>
              <img src={streamers[key].profilePicURL} alt="streamerlogo" />
            </div>
            <span>{streamers[key].username}</span>
          </NavLink>
        );
      });
    }
    return (
      <div className={classes.PopularStreamersContainer}>
        <div>
          Popular <span>Streamers</span>
        </div>
        <div className={classes.PopularStreamers}>{PopularStreamers}</div>
      </div>
    );
  }
}

export default PopularStreamers;
