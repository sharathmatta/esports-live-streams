import React, { Component } from "react";
import classes from "./Login.module.css";
import { checkValidity } from "../../../store/utility";
import { connect } from "react-redux";
import Button from "../../../ui/Button/Button";
import * as actions from "../../../store/actions/index";
import Input from "../../../ui/Input/Input";

class Login extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Adress",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        inpErrMessage: null,
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        inpErrMessage: null,
        valid: false,
        touched: false,
      },
    },
  };
  componentDidMount() {
    this.props.onClearError();
  }
  inputChangedHandler = (event, controlName) => {
    const validity = checkValidity(
      event.target.value,
      this.state.controls[controlName].validation
    );
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: validity.isValid,
        inpErrMessage: validity.errMessage,
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  loginHandler = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
    };
    this.props.onAuth(userData);
  };

  render() {
    let errMessage = null;
    if (this.props.error) {
      errMessage = this.props.error.message;
    }
    const formElementsArray = [];
    for (let key in this.state.controls) {
      formElementsArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    let form = formElementsArray.map((formElement) => (
      <Input
        invalid={!formElement.config.valid}
        errorMessage={formElement.config.inpErrMessage}
        shouldValidate={formElement.config.validation}
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        touched={formElement.config.touched}
        changed={(event) => this.inputChangedHandler(event, formElement.id)}
      />
    ));
    return (
      <div className={classes.Login}>
        <strong style={{ color: "#4879cf" }}>{errMessage}</strong>
        {form}
        <div className={classes.Button}>
          <Button clicked={this.loginHandler}>Log In</Button>
        </div>
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    loading: state.loading,
    error: state.error,
    token: state.token,
  };
};

const matchDispatcToProps = (dispatch) => {
  return {
    onClearError: () => dispatch(actions.clearError()),
    onAuth: (userData) => dispatch(actions.auth(userData, false)),
  };
};

export default connect(matchStateToProps, matchDispatcToProps)(Login);
