import React, { useState, useEffect } from "react";
import classes from "./Browse.module.css";
import GameList from "../GameList/GameList";
import { connect } from "react-redux";
import { db } from "../../firebase";

const Browse = (props) => {
  const types = {
    all: "All",
    fps: "FPS",
    story: "Story Mode",
    br: "Battle Royale",
    sports: "Sports",
    puzzle: "Puzzle",
    simulation: "Simulation",
    strategy: "Strategy",
  };
  const [gamelist, setGamelist] = useState(null);
  const [sortVal, setSortVal] = useState("alpha");
  const [typeVal, setTypeVal] = useState("all");
  useEffect(async () => {
    let games = [];
    if (typeVal === "all") {
      let query = await db.collection("game").get();
      query.forEach((el) => {
        games[el.id] = el.data();
      });
    } else {
      let query = await db
        .collection("game")
        .where("type", "==", typeVal)
        .get();
      query.forEach((el) => {
        games[el.id] = el.data();
      });
    }
    setGamelist(games);
  }, [props, typeVal]);
  const sortChangeHandler = (e) => {
    setSortVal(e.target.value);
  };
  const typeChangeHandler = (e) => {
    setTypeVal(e.target.value);
  };
  const typeOptions = Object.keys(types).map((key) => {
    return (
      <option key={key} value={key}>
        {types[key]}
      </option>
    );
  });
  let sortedgamelist = [];
  if (gamelist) {
    if (sortVal === "alpha") {
      let sorted = Object.entries(gamelist)
        .sort((a, b) => {
          return a[0] > b[0] ? 1 : a[0] < b[0] ? -1 : 0;
        })
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
      sortedgamelist = sorted;
    }
    if (sortVal === "popularity") {
      let sorted = Object.entries(gamelist)
        .sort((a, b) => {
          return a[1].playercount < b[1].playercount
            ? 1
            : a[1].playercount > b[1].playercount
            ? -1
            : 0;
        })
        .reduce((r, [k, v]) => ({ ...r, [k]: v }), {});
      sortedgamelist = sorted;
    }
  }
  let gameList = null;
  gameList = <GameList list={sortedgamelist} wrapped />;

  let content = (
    <div className={classes.BrowseContainer}>
      <div className={classes.Header}>
        <span>Game</span> categories
      </div>
      <div className={classes.SortandFilter}>
        <div className={classes.Sort}>
          Sort by :
          <select onChange={sortChangeHandler}>
            <option value="alpha">A-Z</option>
            <option value="popularity">Popularity</option>
          </select>
        </div>
        <div className={classes.Filter}>
          Type :<select onChange={typeChangeHandler}>{typeOptions}</select>
        </div>
      </div>
      <div className={classes.GamesContainer}>{gameList}</div>
    </div>
  );
  return <div className={classes.Browse}>{content}</div>;
};

const matchStateToProps = (state) => {
  return {};
};

const matchDispatchToProps = (dispatch) => {
  return {};
};

export default connect(matchStateToProps, matchDispatchToProps)(Browse);
