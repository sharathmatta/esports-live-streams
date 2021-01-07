import React, { Component, useRef } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideContent from "../../components/SideContent/SideContent";
import Aux from "../../hoc/Auxiliary";
import Modal from "../../ui/modal/modal";
import SignIn from "../../components/SignIn/SignIn";
import classes from "./Layout.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Layout extends Component {
  state = {
    SigningIn: this.props.signingIn,
    users: null,
  };
  SignInHandler = () => {
    const status = this.state.SigningIn;
    this.setState({ SigningIn: !status });
  };
  SignInCancelHandler = () => {};
  render() {
    let showModal = this.props.token ? false : this.props.signingIn;
    return (
      <Aux>
        <Modal show={showModal} backDropClick={this.props.onHideSignIn}>
          <SignIn />
        </Modal>
        <Toolbar SignInClicked={this.props.onShowSignIn} />
        <div className={classes.MainContainer}>
          <div className={classes.SideContent}>
            <SideContent />
          </div>
          <div className={classes.MainContent}>{this.props.children}</div>
        </div>
      </Aux>
    );
  }
}
const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
    signingIn: state.auth.showSignIn,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onShowSignIn: () => dispatch(actions.showSignIn()),
    onHideSignIn: () => dispatch(actions.hideSignIn()),
  };
};
export default connect(matchStateToProps, matchDispatchToProps)(Layout);
