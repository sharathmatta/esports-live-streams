import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Following from "../components/Following/Following";
import Profile from "../components/Profile/Profile";
import Recommended from "../components/Recommended/Recommended";
import Browse from "../components/Browse/Browse.js";
import Player from "../components/Player/Player";
import AddGameOrStream from "../components/AddGameOrStreams/AddGameOrStream";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route path="/Following" exact component={Following} />
            <Route path="/Recommended" exact component={Recommended} />
            <Route path="/Browse" exact component={Browse} />
            <Route path="/Profile/:username" exact component={Profile} />
            <Route path="/add" component={AddGameOrStream} />
            <Route path="/" exact component={Home} />
            <Route path="/:username" component={Player} />
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
