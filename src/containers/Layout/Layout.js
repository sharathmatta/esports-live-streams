import React, { Component } from "react";
import Toolbar from "../../components/Toolbar/Toolbar";
import SideContent from "../../components/SideContent/SideContent";
import Aux from "../../hoc/Auxiliary";
import Modal from "../../ui/modal/modal";
import SignIn from "../../components/SignIn/SignIn";
import classes from "./Layout.module.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

class Layout extends Component {
  state = {
    SigningIn: false,
    users: null,
  };
  componentDidMount() {
    this.props.onCheckAuthState();
  }
  componentDidUpdate() {
    if (this.props.userId) {
      this.props.onInit(this.props.userId);
    }
  }

  SignInHandler = () => {
    const status = this.state.SigningIn;
    this.setState({ SigningIn: !status });
  };
  SignInCancelHandler = () => {
    this.setState({ SigningIn: false });
  };
  render() {
    let showModal = this.props.token ? false : this.state.SigningIn;
    return (
      <Aux>
        <Modal show={showModal} backDropClick={this.SignInCancelHandler}>
          <SignIn />
        </Modal>
        <Toolbar SignInClicked={this.SignInHandler} />
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
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
    onInit: (userId) => dispatch(actions.checkLoginStatus(userId)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Layout);
