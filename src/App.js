import React, { Component } from "react";
import SearchModal from "./components/SearchModal.js";
import { Button, notification } from "antd";
import testData from "./data/testData.js";
import Graph from "./components/Graph.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: [],
      isModalVisible: false
    };
  }

  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  render() {
    const graphs = this.state.searchParams.map(param => {
      return <Graph searchParams={param} />;
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

        <SearchModal
          isVisible={this.state.isModalVisible}
          searchParams={this.state.searchParams}
          updateParent={(field, newValue) => this.updateField(field, newValue)}
        />
        <div style={{ display: "flex", flexWrap: "wrap" }}>{graphs}</div>
      </div>
    );
  }
}

export default App;
