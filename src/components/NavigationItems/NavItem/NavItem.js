import React from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

const navItem = (props) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink activeClassName={classes.active} to={props.link}>
        <strong>{props.children}</strong>
      </NavLink>
    </li>
  );
};

export default navItem;
