import React from "react";
import StreamersRecommended from "../StreamersRecommended/StreamersRecommended";
import HomeRecommended from "../VideosRecommended/VideosRecommended";
import classes from "./Recommended.module.css";

const recommended = () => {
  let content = null;
  content = (
    <div>
      <StreamersRecommended />
      <HomeRecommended />
    </div>
  );
  return <div className={classes.Recommended}>{content}</div>;
};

export default recommended;
