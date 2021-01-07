import "./App.css";
import { useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Following from "../components/Following/Following";
import Profile from "../components/Profile/Profile";
import Recommended from "../components/Recommended/Recommended";
import Browse from "../components/Browse/Browse.js";
import Player from "../components/Player/Player";
import AddGameOrStream from "../components/AddGameOrStreams/AddGameOrStream";
import * as actions from "../store/actions/index";
import withLoginCheck from "../hoc/withLoginCheck";
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
            <Route path="/Following/" component={Following} />
            <Route path="/Recommended" component={Recommended} />
            <Route path="/Browse" t component={Browse} />
            <Route path="/Profile/:username" component={Profile} />
            <Route path="/add" component={AddGameOrStream} />
            <Route path="/" exact component={Home} />
            <Route path="/:username" component={Player} />
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
