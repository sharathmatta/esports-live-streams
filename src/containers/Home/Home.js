import React from "react";
import classes from "./Home.module.css";
import HomeBrowse from "./HomeBrowse/HomeBrowse";
import HomeFollowing from "../../components/VideosFollowing/VideosFollowing";
import HomeRecommended from "../../components/VideosRecommended/VideosRecommended";

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
