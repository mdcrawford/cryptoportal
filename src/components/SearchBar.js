import React, { Component } from "react";
import { Checkbox, Button, Radio, notification } from "antd";
import * as googleTrends from "google-trends-api";

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

export default class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCurrencies: [],
      timeframe: 1,
      googleTrendsData: []
    };
  }

  // grabs the relevant data from Google Trends about the selected currencies within
  // the selected timeframe
  searchGoogleTrends(keywords, timeframe) {
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
        this.updateField(
          "googleTrendsData",
          resultsObject.default.timelineData
        );
      })
      .catch(error =>
        notification.error({
          message: "ERROR",
          description: "There was an error processing your request."
        })
      );
  }

  // update state
  updateField(field, newValue) {
    this.setState({
      ...this.state,
      [field]: newValue
    });
  }

  onClickSearch() {
    if (this.state.selectedCurrencies.length === 0) {
      notification.error({
        message: "ERROR",
        description: "Please select at least one cryptocurrency to continue."
      });
    } else {
      this.searchGoogleTrends(
        this.state.selectedCurrencies,
        this.state.timeframe
      );
    }
  }

  render() {
    console.log(this.state);
    let options = ["Bitcoin", "Ethereum", "Ripple", "Litecoin"];
    return (
      <div>
        <CheckboxGroup
          options={options}
          onChange={checkedValues =>
            this.updateField("selectedCurrencies", checkedValues)
          }
          value={this.state.selectedCurrencies}
        />

        <br />
        <br />

        <RadioGroup
          value={this.state.timeframe}
          onChange={e => this.updateField("timeframe", e.target.value)}
        >
          <Radio value={1}> Past Day </Radio>
          <Radio value={6}> Past Week </Radio>
          <Radio value={30}> Past Month </Radio>
        </RadioGroup>

        <Button
          type="primary"
          icon="search"
          onClick={() => this.onClickSearch()}
        >
          {" "}
          Search{" "}
        </Button>
      </div>
    );
  }
}
