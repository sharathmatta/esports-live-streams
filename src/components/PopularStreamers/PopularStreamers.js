import React, { Component } from "react";
import classes from "./PopularStreamers.module.css";
import { db } from "../../firebase";
import StreamerList from "../StreamerList/StreamerList";
import { connect } from "react-redux";

class PopularStreamers extends Component {
  state = {
    streamers: null,
  };
  componentDidMount() {
    let streamerList = [];
    if (this.props.token && this.props.username) {
      db.collection("streamers")
        .limit(15)
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            console.log(doc.id, this.props.username);
            if (doc.id !== this.props.username) {
              streamerList.push(doc.data());
            }
          });
          this.setState({ streamers: streamerList });
        });
    } else {
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
  }
  render() {
    let PopularStreamers = <StreamerList />;
    if (this.state.streamers) {
      const streamers = this.state.streamers;
      if (streamers.length > 0) {
        PopularStreamers = <StreamerList list={streamers.slice(0, 12)} />;
      }
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

const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    user: state.auth.username,
  };
};

export default connect(matchStateToProps)(PopularStreamers);
