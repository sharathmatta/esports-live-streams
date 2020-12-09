import React from "react";
import classes from "./HomeBrowse.module.css";
import GameCategories from "../../../components/GameCategories/GameCatergories";
import PopularStreamers from "../../../components/PopularStreamers/PopularStreamers";

const homeBrowse = () => {
  return (
    <div className={classes.HomeBrowse}>
      <GameCategories />
      <PopularStreamers />
    </div>
  );
};

export default homeBrowse;
