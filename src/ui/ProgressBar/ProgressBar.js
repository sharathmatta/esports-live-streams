import React from "react";
import classes from "./ProgressBar.module.css";

const progressBar = (props) => {
  return (
    <div className={classes.Container}>
      <div className={classes.ProgressbarContainer}>
        <div
          className={classes.ProgressbarComplete}
          style={{ width: `${props.percentage}%` }}
        >
          <div className={classes.ProgressbarLiquid}></div>
        </div>
        <span className={classes.Progress}>{props.percentage}%</span>
      </div>
    </div>
  );
};

export default progressBar;
