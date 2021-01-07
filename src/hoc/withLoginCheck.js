import React, { Component } from "react";
import { connect } from "react-redux";

const withLoginCheck = (WrappedContent, props) => {
  return class extends Component {
    componentWillMount() {
      if (props.token) {
        console.log("hello");
      }
      if (props.loginChecked) {
        console.log("hi");
      }
    }
    render() {
      return <WrappedContent {...this.props} />;
    }
  };
};
export default withLoginCheck;
