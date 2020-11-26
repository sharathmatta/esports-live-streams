import React, { Component } from "react";
import classes from "./Toolbar.module.css";
import NavItems from "../../NavigationItems/NavigationItems";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
class Toolbar extends Component {
  render() {
    return (
      <div>
        <nav>
          <input
            type="checkbox"
            id="hamburgerToggle"
            className={classes.hamburgerToggle}
          ></input>
          <label htmlFor="hamburgerToggle" className={classes.hamburger}>
            <span className={classes.bar}></span>
          </label>
          <ul className={classes.navList}>
            <li>
              <a href="#">home</a>
            </li>
            <li>
              <a href="#">about</a>
            </li>
            <li>
              <a href="#">services</a>
            </li>
            <li>
              <a href="#">gallery</a>
            </li>
            <li>
              <a href="#">contact</a>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

export default Toolbar;
