import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Following from "../components/Following/Following";
import Profile from "../components/Profile/Profile";
import Recommended from "../components/Recommended/Recommended";
import Browse from "../components/Browse/Browse.js";
import AddGameOrStream from "../components/AddGameOrStreams/AddGameOrStream";
const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Route path="/" exact component={Home} />
          <Route path="/Following" exact component={Following} />
          <Route path="/Recommended" exact component={Recommended} />
          <Route path="/Browse" exact component={Browse} />
          <Route path="/Profile" exact component={Profile} />
          <Route path="/add" component={AddGameOrStream} />
          <Route path="/home" component={Home} />
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
