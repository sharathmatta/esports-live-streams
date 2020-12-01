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
    this.setState({ SigningIn: true });
  };
  SignInCancelHandler = () => {
    this.setState({ SigningIn: false });
  };
  render() {
    let redirect = null;
    redirect = this.props.token ? <Redirect to="/" /> : <SignIn />;
    if (!this.state.SigningIn) {
      redirect = <Redirect to="/" />;
    }
    let showModal = this.props.token ? false : this.state.SigningIn;
    return (
      <Aux>
        <Modal show={showModal} backDropClick={this.SignInCancelHandler}>
          {redirect}
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
const matchStateToProps = (state) => {
  return {
    token: state.token,
    userId: state.userId,
  };
};
const matchDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
    onInit: (userId) => dispatch(actions.checkLoginStatus(userId)),
  };
};

export default connect(matchStateToProps, matchDispatchToProps)(Layout);
