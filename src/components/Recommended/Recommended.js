import React from "react";
import PopularStreamers from "../PopularStreamers/PopularStreamers";
import HomeRecommended from "../VideosRecommended/VideosRecommended";
import classes from "./Recommended.module.css";

const recommended = () => {
  let content = null;
  content = (
    <div>
      <PopularStreamers />
      <HomeRecommended />
    </div>
  );
  return <div className={classes.Recommended}>{content}</div>;
};

export default recommended;
