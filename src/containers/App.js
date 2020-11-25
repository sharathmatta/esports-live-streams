import "./App.css";
import { BrowserRouter, Route } from "react-router-dom";
import Layout from "./Layout/Layout";

const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <div></div>
        </Layout>
      </div>
    </BrowserRouter>
  );
};

export default App;
