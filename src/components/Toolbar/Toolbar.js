import React, { useEffect, useRef, useState } from "react";
import classes from "./Toolbar.module.css";
import NavItems from "../NavigationItems/NavigationItems";
import { Link, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import Button from "../../ui/Button/Button";
import * as actions from "../../store/actions/index";

const Toolbar = (props) => {
  const [open, setOpen] = useState(false);

  const useOutsideAlerter = (ref) => {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          setOpen(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  };

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);

  const dropdown = (
    <div className={classes.Dropdown} ref={wrapperRef}>
      <Link to={"/Profile/" + props.username} className={classes.MenuItem}>
        Profile
      </Link>
      <Link
        to="/"
        className={classes.MenuItem}
        onClick={() => {
          props.onLogout();
          props.SignInClicked();
        }}
      >
        Logout
      </Link>
    </div>
  );

  return (
    <div className={classes.Toolbar}>
      <div className={classes.ToolbarContent}>
        <div className={classes.NavItems}>
          <NavItems className={classes.NavItems} />
        </div>
        <div className={classes.RightContainer}>
          <div
            style={{ display: props.userId ? "block" : "none" }}
            onClick={() => setOpen(!open)}
          >
            <div className={classes.Profile}>
              <img src={props.profileURL} alt="pp" />
            </div>
            {open && dropdown}
          </div>
          <div
            className={classes.SignIn}
            onClick={props.SignInClicked}
            style={{ display: props.userId ? "none" : "block" }}
          >
            <Button>Sign In</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const matchStateToProps = (state) => {
  return {
    userId: state.auth.userId,
    username: state.auth.username,
    profileURL: state.auth.profileURL,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onProfileInit: (username) => dispatch(actions.initializeProfile(username)),
    onLogout: () => dispatch(actions.logout()),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Toolbar);
