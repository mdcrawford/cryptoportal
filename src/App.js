import React, { Component } from "react";
import SearchModal from "./components/SearchModal.js";
import { Button, notification } from "antd";
import testData from "./data/testData.js";
import Graph from "./components/Graph.js";
import Login from "./pages/Login.js";
import ViewGraphs from "./pages/ViewGraphs.js";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import firebase from "./configs/firebaseConfig";
import Header from "./components/Header.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: undefined
    };
  }

  componentWillMount() {
    let auth = firebase.auth();
    auth.onAuthStateChanged(user => {
      if (user) {
        this.setState({
          ...this.state,
          userInfo: user
        });
      } else {
        this.setState({
          ...this.state,
          userInfo: undefined
        });
      }
    });
  }

  render() {
    console.log(this.state);
    let loginStatus = this.state.userInfo ? true : false;
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header isLoggedIn={loginStatus} />
            <Switch>
              <Route exact path="/" component={() => <Login />} />
              <Route
                exact
                path="/viewgraphs"
                component={() => <ViewGraphs />}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
