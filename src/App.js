import React, { Component } from "react";
import SearchModal from "./components/SearchModal.js";
import { Button, notification } from "antd";
import * as googleTrends from "google-trends-api";
import testData from "./data/testData.js";
import Graph from "./components/Graph.js";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: [],
      isModalVisible: false,
      searchData: []
    };
  }

  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  // grabs the relevant data from Google Trends about the selected currencies within
  // the selected timeframe
  searchGoogleTrends(keywords, timeframe, index) {
    let startDate = new Date();
    startDate.setDate(startDate.getDate() - timeframe);

    let searchObject = {
      keyword: keywords,
      startTime: startDate,
      granularTimeResolution: true
    };

    googleTrends
      .interestOverTime(searchObject)
      .then(results => {
        let resultsObject = JSON.parse(results);
        console.log(resultsObject);
      })
      .catch(error =>
        notification.error({
          message: "ERROR",
          description: "There was an error processing your request."
        })
      );
  }

  render() {
    console.log(testData.default.timelineData);
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

        <Graph data={testData.default.timelineData} />
      </div>
    );
  }
}

export default App;
