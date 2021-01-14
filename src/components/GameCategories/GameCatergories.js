import React, { Component } from "react";
import classes from "./GameCategories.module.css";
import GameList from "../GameList/GameList";
import { NavLink } from "react-router-dom";
import { db } from "../../firebase";

class GameCategories extends Component {
  state = {
    games: null,
  };
  componentDidMount() {
    let gameList = [];
    db.collection("game")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          gameList[doc.id] = {
            ...doc.data(),
          };
        });
        this.setState({ games: gameList });
      });
  }
  render() {
    let Games = null;
    const games = this.state.games;
    Games = <GameList list={games} />;

    return (
      <div>
        <div className={classes.GameCategories}>
          <span>Game </span>Categories
        </div>
        <div className={classes.GameContainer}>{Games}</div>
      </div>
    );
  }
}

export default GameCategories;
