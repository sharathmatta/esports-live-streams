import React from "react";
import classes from "./NavItem.module.css";
import { NavLink } from "react-router-dom";

const navItem = (props) => {
  return (
    <li className={classes.NavigationItem} onClick={props.NavItemClicked}>
      <NavLink activeClassName={classes.active} to={props.link} exact>
        <strong>{props.children}</strong>
      </NavLink>
    </li>
  );
};

export default navItem;
