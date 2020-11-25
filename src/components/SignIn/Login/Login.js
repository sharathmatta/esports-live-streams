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
        valid: false,
        touched: false,
      },
    },
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      },
    };
    this.setState({ controls: updatedControls });
  };

  loginHandler = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
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
    onAuth: (email, password) => dispatch(actions.auth(email, password, false)),
  };
};

export default connect(matchStateToProps, matchDispatcToProps)(Login);
