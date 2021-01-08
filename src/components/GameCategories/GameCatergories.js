import React, { Component } from "react";
import classes from "./GameCategories.module.css";
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
    if (this.state.games) {
      const games = this.state.games;
      Games = Object.keys(this.state.games).map((key) => {
        return (
          <NavLink to={"/Game/" + key} key={key}>
            <div className={classes.Game}>
              <img src={games[key].logo} alt="gamelogo" />
            </div>
            <div className={classes.GameDetails}>
              <div className={classes.GameId}>
                <span>{games[key].id}</span>
              </div>
            </div>
          </NavLink>
        );
      });
    }
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
