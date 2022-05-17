import React, { Component } from "react";
import { connect } from "react-redux";

const withLoginCheck = (WrappedContent, props) => {
  return class extends Component {
    componentWillMount() {
      if (props.token) {
      }
      if (props.loginChecked) {
      }
    }
    render() {
      return <WrappedContent {...this.props} />;
    }
  };
};
export default withLoginCheck;
