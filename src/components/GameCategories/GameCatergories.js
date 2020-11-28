import React, { Component } from "react";
import classes from "./GameCategories.module.css";
import { NavLink } from "react-router-dom";
import GameLogo from "../../assets/330c424f4045aa91b8893043ce7dacaa.jpg";
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
          gameList.push(doc.data());
        });
        this.setState({ games: gameList });
      });
  }
  render() {
    let Games = null;
    if (this.state.games) {
      const games = this.state.games;
      Games = Object.keys(this.state.games).map((key) => {
        console.log(key);
        return (
          <NavLink to="/" key={games[key].username}>
            <div className={classes.Game}>
              <img src={games[key].logo} alt="gamelogo" />
            </div>
            <div className={classes.GameId}>
              <span>{games[key].id}</span>
            </div>
          </NavLink>
        );
      });
    }
    console.log(Games);
    return (
      <div className={classes.GameCategories}>
        <div>
          <span>Game </span>Categories
        </div>
        {Games}
      </div>
    );
  }
}

export default GameCategories;
