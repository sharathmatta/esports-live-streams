import React, { Component } from "react";
import classes from "./Signup.module.css";
import { checkValidity } from "../../../store/utility";
import { connect } from "react-redux";
import Button from "../../../ui/Button/Button";
import * as actions from "../../../store/actions/index";
import Input from "../../../ui/Input/Input";
import { db, auth } from "../../../firebase";
import spinner from "../../../ui/spinner/Spinner";

class Signup extends Component {
  state = {
    streamers: null,
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Mail Address",
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
      username: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Username",
        },
        value: "",
        validation: {
          required: true,
          isUsername: true,
          existingStreamers: [],
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
    profile: null,
  };
  componentDidMount() {
    const docIds = [];
    db.collection("streamers")
      .get()
      .then((snapshot) => {
        snapshot.forEach((doc) => {
          docIds.push(doc.id);
        });
        this.setState({ streamers: docIds });
      });
    this.props.onClearError();
  }

  inputChangedHandler = (event, controlName) => {
    const existing = this.state.streamers;
    const validity = checkValidity(
      event.target.value,
      this.state.controls[controlName].validation,
      existing
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

  SignupHandler = (event) => {
    event.preventDefault();
    const userData = {
      email: this.state.controls.email.value,
      password: this.state.controls.password.value,
      username: this.state.controls.username.value,
      profilePic: this.state.profile,
    };
    this.props.onSignUp(userData);
  };
  profileChangeHandler = (event) => {
    if (event.target.files[0]) {
      this.setState({ profile: event.target.files[0] });
    }
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
      <div className={classes.Signup}>
        <strong style={{ color: "#4879cf" }}>{errMessage}</strong>
        {form}
        <Input
          elementType="file"
          changed={this.profileChangeHandler}
          label={"Profile Picture :"}
        />
        <div className={classes.Button}>
          <Button clicked={this.SignupHandler}>Sign Up</Button>
        </div>
      </div>
    );
  }
}

const matchStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    token: state.auth.token,
  };
};

const matchDispatcToProps = (dispatch) => {
  return {
    onClearError: () => dispatch(actions.clearError()),
    onSignUp: (userData) => {
      dispatch(actions.auth(userData, true));
    },
  };
};

export default connect(matchStateToProps, matchDispatcToProps)(Signup);
