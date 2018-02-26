import React, { Component } from "react";
import SearchModal from "../components/SearchModal.js";
import { Button, notification } from "antd";
import { Redirect } from "react-router";
import Graph from "../components/Graph.js";
import firebase from "../configs/firebaseConfig";

export default class ViewGraphs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: [],
      isModalVisible: false,
      currencies: undefined
    };
  }

  componentWillMount() {
    firebase
      .database()
      .ref("/coins")
      .on("value", snapshot => {
        this.setState({
          ...this.state,
          currencies: snapshot.val()
        });
      });
  }

  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  render() {
    if (!this.props.userInfo) {
      return <Redirect to="/" />;
    }

    const graphs = this.state.searchParams.map(param => {
      return <Graph searchParams={param} currencies={this.state.currencies} />;
    });

    return (
      <div className="App">
        <h1> CryptoPortal </h1>

        <Button
          type="primary"
          icon="plus"
          onClick={() => this.updateField("isModalVisible", true)}
        >
          {" "}
          Add New Graph(s){" "}
        </Button>

        <br />
        <br />

        {this.state.currencies && (
          <SearchModal
            isVisible={this.state.isModalVisible}
            searchParams={this.state.searchParams}
            updateParent={(field, newValue) =>
              this.updateField(field, newValue)
            }
            currencies={this.state.currencies}
          />
        )}
        <div style={{ display: "flex", flexWrap: "wrap" }}>{graphs}</div>
      </div>
    );
  }
}
