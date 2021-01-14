import React from "react";
import GameBlock from "./GameBlock/GameBlock";
import classes from "./GameList.module.css";

const GameList = (props) => {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17];
  let gameList = Object.keys(arr).map((key) => {
    return <GameBlock key={key} />;
  });
  if (props.list) {
    gameList = Object.keys(props.list).map((key) => {
      return (
        <GameBlock
          key={key}
          id={key}
          gamename={props.list[key].id}
          logo={props.list[key].logo}
        />
      );
    });
  }
  return (
    <div className={props.wrapped ? classes.GameListWrap : classes.GameListRow}>
      {gameList}
    </div>
  );
};

export default GameList;
