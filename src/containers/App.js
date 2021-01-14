import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import AddGameOrStream from "../components/AddGameOrStreams/AddGameOrStream";
import * as actions from "../store/actions/index";
import asyncComponent from "../hoc/asyncComponent";

const asyncProfile = asyncComponent(() => {
  return import("../components/Profile/Profile");
});
const asyncFollowing = asyncComponent(() => {
  return import("../components/Following/Following");
});
const asyncRecommended = asyncComponent(() => {
  return import("../components/Recommended/Recommended");
});
const asyncBrowse = asyncComponent(() => {
  return import("../components/Browse/Browse");
});
const asyncGameProfile = asyncComponent(() => {
  return import("../components/GameProfile/GameProfile");
});
const asyncPlayer = asyncComponent(() => {
  return import("../components/Player/Player");
});

const App = (props) => {
  useEffect(() => {
    props.onCheckAuthState();
    if (props.token) {
      props.onInit(props.userId);
    }
  }, [props, props.token]);
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route path="/Following/" component={asyncFollowing} />
            <Route path="/Recommended" component={asyncRecommended} />
            <Route path="/Browse" t component={asyncBrowse} />
            <Route path="/Profile/:username" component={asyncProfile} />
            <Route path="/Game/:gameid" component={asyncGameProfile} />
            <Route path="/add" component={AddGameOrStream} />
            <Route path="/" exact component={Home} />
            <Route path="/:username" component={asyncPlayer} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

const matchDispatchToProps = (dispatch) => {
  return {
    onCheckAuthState: () => dispatch(actions.checkAuthState()),
    onInit: (userId) => dispatch(actions.checkLoginStatus(userId)),
  };
};
const matchStateToProps = (state) => {
  return {
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
export default connect(matchStateToProps, matchDispatchToProps)(App);
