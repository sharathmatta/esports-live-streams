import React, { Component } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideContent from "../../components/SideContent/SideContent";
import Aux from "../../hoc/Auxiliary";
import Modal from "../../ui/modal/modal";
import SignIn from "../../components/SignIn/SignIn";
import classes from "./Layout.module.css";

class Layout extends Component {
  state = {
    SigningIn: false,
  };
  SignInHandler = () => {
    this.setState({ SigningIn: true });
  };
  SignInCancelHandler = () => {
    this.setState({ SigningIn: false });
  };
  render() {
    return (
      <Aux>
        <Modal
          show={this.state.SigningIn}
          backDropClick={this.SignInCancelHandler}
        >
          <SignIn />
        </Modal>
        <Toolbar SignInClicked={this.SignInHandler} />

        <div className={classes.MainContainer}>
          <SideContent className={classes.SideContent} />
          <div className={classes.MainContent}>{this.props.children}</div>
        </div>
      </Aux>
    );
  }
}

export default Layout;
