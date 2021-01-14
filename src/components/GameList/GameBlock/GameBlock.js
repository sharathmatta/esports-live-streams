import React from "react";
import blankGame from "../../../assets/—Pngtree—white video game controller with_5424568.png";
import classes from "./GameBlock.module.css";
import { NavLink } from "react-router-dom";

const GameBlock = (props) => {
  let gameBlock = (
    <div className={classes.DummyGame}>
      <div className={classes.DummyGameImg}>
        <div className={classes.ForAnimation}></div>
      </div>
      <div className={classes.DummyGameName}></div>
    </div>
  );
  if (props.id) {
    gameBlock = (
      <NavLink to={"/Game/" + props.id} key={props.id}>
        <div className={classes.Game}>
          <img
            src={props.logo}
            alt="gamelogo"
            onError={(e) => {
              e.target.src = blankGame;
              e.target.onError = null;
            }}
          />
        </div>
        <div className={classes.GameDetails}>
          <div className={classes.GameId}>
            <span>{props.gamename}</span>
          </div>
        </div>
      </NavLink>
    );
  }
  return <div className={classes.GameBlock}>{gameBlock}</div>;
};

export default GameBlock;
