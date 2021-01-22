import classes from "./SelectGames.module.css";
import React, { useState, useEffect } from "react";
import { db } from "../../../../firebase";
import Spinner from "../../../../ui/spinner/Spinner";
import Button from "../../../../ui/Button/Button";
import { connect } from "react-redux";
import Aux from "../../../../hoc/Auxiliary";

const SelectGames = (props) => {
  const [selected, setSelected] = useState([]);
  const [btnDisable, setbtnDisable] = useState(false);
  const [Games, setGames] = useState(null);
  useEffect(async () => {
    let query = await db
      .collection("game")
      .orderBy("playercount", "desc")
      .limit(15)
      .get();
    const Games = [];
    query.forEach((el) => {
      Games.push(el.id);
    });
    let xxx = [];
    Games.forEach((el) => {
      xxx[el] = false;
    });
    setGames(xxx);
  }, []);

  const selectHandler = (streamer) => {
    const val = !Games[streamer];
    setGames({
      ...Games,
      [streamer]: val,
    });
  };
  const continueHandler = () => {
    let result = [];
    setbtnDisable(true);
    Object.keys(Games).forEach((el) => {
      if (Games[el] === true) {
        result.push(el);
      }
    });
    props.continued(result);
  };
  let list = null;
  let content = <Spinner />;
  if (Games) {
    list = Object.keys(Games).map((key) => {
      const streamer = key;
      return (
        <div
          key={key}
          className={Games[streamer] ? classes.NotSelected : classes.Selected}
          onClick={() => selectHandler(streamer)}
        >
          <div className={classes.StreamerName}>{streamer}</div>
        </div>
      );
    });
    content = (
      <Aux>
        <div className={classes.Header}>Select Games you play</div>
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
  return <div className={classes.SelectGames}>{content}</div>;
};

export default SelectGames;
