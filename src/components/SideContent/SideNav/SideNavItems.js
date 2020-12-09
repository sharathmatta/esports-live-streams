import React from "react";
import classes from "./SideNavItems.module.css";
import SideNavItem from "./SideNavItem/SideNavItem";

const sideNavItems = (props) => {
  let smallDivs = Object.keys(props.list).map((key) => {
    return <SideNavItem details={props.list[key]} key={key} />;
  });
  return <div className={classes.SideNavItems}>{smallDivs}</div>;
};

export default sideNavItems;
