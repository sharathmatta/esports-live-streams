import React from "react";
import classes from "./Home.module.css";
import HomeBrowse from "./HomeBrowse/HomeBrowse";
import HomeFollowing from "./HomeFollowing/HomeFollowing";
import HomeRecommended from "./HomeRecommended/HomeRecommended";

const home = () => {
  return (
    <div className={classes.Home}>
      <HomeBrowse />
      <HomeFollowing />
      <HomeRecommended />
    </div>
  );
};

export default home;
