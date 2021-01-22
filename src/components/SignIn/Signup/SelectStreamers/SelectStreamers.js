import classes from "./SelectStreamers.module.css";
import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import Spinner from "../../../../ui/spinner/Spinner";
import Button from "../../../../ui/Button/Button";
import { connect } from "react-redux";
import Aux from "../../../../hoc/Auxiliary";

const SelectStreamers = (props) => {
  const [selected, setSelected] = useState([]);
  const [btnDisable, setbtnDisable] = useState(false);
  const [streamers, setStreamers] = useState(null);
  useEffect(async () => {
    let query = await db
      .collection("streamers")
      .orderBy("followercount", "desc")
      .limit(12)
      .get();
    const streamers = [];
    query.forEach((el) => {
      if (el.id !== props.currentuser) {
        streamers.push(el.id);
      }
    });
    let xxx = [];
    streamers.forEach((el) => {
      xxx[el] = false;
    });
    setStreamers(xxx);
  }, []);

  const selectHandler = (streamer) => {
    const val = !streamers[streamer];
    setStreamers({
      ...streamers,
      [streamer]: val,
    });
  };
  const continueHandler = () => {
    let result = [];
    setbtnDisable(true);
    Object.keys(streamers).forEach((el) => {
      if (streamers[el] === true) {
        result.push(el);
      }
    });
    props.continued(result);
  };
  let list = null;
  let content = <Spinner />;
  if (streamers) {
    list = Object.keys(streamers).map((key) => {
      const streamer = key;
      return (
        <div
          key={key}
          className={
            streamers[streamer] ? classes.NotSelected : classes.Selected
          }
          onClick={() => selectHandler(streamer)}
        >
          <div className={classes.StreamerName}>{streamer}</div>
        </div>
      );
    });
    content = (
      <Aux>
        <div className={classes.Header}>Follow Streamers you like</div>
        <div>{list}</div>
        <div className={classes.Buttons}>
          <div
            className={classes.Skip}
            style={{ display: btnDisable ? "none" : "block" }}
            onClick={props.skipped}
          >
            skip
          </div>
          <Button disable={btnDisable} clicked={continueHandler}>
            Continue
          </Button>
        </div>
      </Aux>
    );
  }
  return <div className={classes.SelectStreamers}>{content}</div>;
};

export default SelectStreamers;
