import React from "react";
import { Link } from "react-router-dom";
import blankProfile from "../../../../assets/blank-profile-picture-973460_1280.png";
import classes from "./SideNavItem.module.css";

const sideNavItem = (props) => {
  return (
    <Link
      to={"/Profile/" + props.details.username}
      className={classes.SideNavItem}
    >
      <div className={classes.ProfileContainer}>
        <img
          src={props.details.profilePicURL}
          alt="ff"
          onError={(e) => {
            e.target.src = blankProfile;
          }}
        />
      </div>
      <div className={classes.UserName}>{props.details.username}</div>
    </Link>
  );
};

export default sideNavItem;
