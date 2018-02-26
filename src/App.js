import React, { Component } from "react";
import SearchModal from "./components/SearchModal.js";
import { Button, notification } from "antd";
import testData from "./data/testData.js";
import Graph from "./components/Graph.js";
import Login from "./pages/Login.js";
import ViewGraphs from "./pages/ViewGraphs.js";
import ChangePassword from "./pages/ChangePassword";
import { Switch, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import firebase from "./configs/firebaseConfig";
import Header from "./components/Header.js";
import AddCoin from "./pages/AddCoin.js";
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
    let loginStatus = this.state.userInfo ? true : false;
    return (
      <div>
        <BrowserRouter>
          <div>
            <Header isLoggedIn={loginStatus} />
            <Switch>
              <Route
                exact
                path="/"
                component={() => <Login userInfo={this.state.userInfo} />}
              />
              <Route
                exact
                path="/viewgraphs"
                component={() => <ViewGraphs userInfo={this.state.userInfo} />}
              />
              <Route
                exact
                path="/addcoin"
                component={() => <AddCoin userInfo={this.state.userInfo} />}
              />
              <Route
                exact
                path="/changepassword"
                component={() => (
                  <ChangePassword userInfo={this.state.userInfo} />
                )}
              />
            </Switch>
          </div>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
