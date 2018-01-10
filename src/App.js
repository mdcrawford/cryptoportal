import React, { Component } from "react";
import searchGoogleTrends from "./googleTrends/searchGoogleTrends";
import SearchModal from "./components/SearchModal.js";
import { Button } from "antd";
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
    console.log(this.state);
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

        <SearchModal
          isVisible={this.state.isModalVisible}
          searchParams={this.state.searchParams}
          updateParent={(field, newValue) => this.updateField(field, newValue)}
        />
      </div>
    );
  }
}

export default App;
