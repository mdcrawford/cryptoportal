import React, { Component } from "react";
import { VictoryLine, VictoryChart, VictoryTheme, VictoryAxis } from "victory";
import { notification } from "antd";
import axios from "axios";
import * as googleTrends from "google-trends-api";

/* PROPS
  searchParams: obj; has fields
    currency: string
    timeframe: int (1, 6, or 30) based on day, week, month
  currencies: obj, keys are the currency names, values are the currency abbreviations
*/

/* STATE
  data: [obj], the array pulled from the API call's results.default.timelineData
*/

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.searchGoogleTrends(
      this.props.searchParams.currency,
      this.props.searchParams.timeframe
    );
  }

  // grabs the relevant data from Google Trends about the selected currencies within
  // the selected timeframe
  searchGoogleTrends(keyword, timeframe) {
    // alberto requested it search for "BTC Coin" or "ETH Coin" instead of "Bitcoin" or
    // "Ethereum", so here we grab that abbreviation
    let abbrev = this.props.currencies[keyword];
    abbrev = abbrev + "%20Coin";

    // make the call to our Google Cloud Function
    let url =
      "https://us-central1-crypto-server.cloudfunctions.net/trendsGET?keyword=" +
      abbrev +
      "&timeframe=" +
      timeframe;
    console.log(url);

    axios
      .get(url)
      .then(result => {
        this.setState({
          ...this.state,
          data: result.data
        });
      })
      .catch(error => {
        console.log(error);
        notification.error({
          message: "ERROR",
          description: "There was an error making your request.",
          duration: 2
        });
      });
  }

  convertMillisecondsToTimestamp(ms) {
    let d = new Date(ms);
    return "x";
  }

  render() {
    // create the strings for the title
    let currencyString = this.props.searchParams.currency;
    let timeString = "day";
    if (this.props.searchParams.timeframe === 6) {
      timeString = "week";
    } else if (this.props.searchParams.timeframe === 30) {
      timeString = "month";
    }

    return (
      <div style={{ width: "100%", maxWidth: "500px" }}>
        <h3>
          {" "}
          {currencyString} over the last {timeString}{" "}
        </h3>
        {this.state.data.length === 0 && <p> Loading... </p>}
        {this.state.data.length > 0 && (
          <VictoryChart>
            <VictoryAxis
              tickFormat={ms => this.convertMillisecondsToTimestamp(ms)}
            />
            <VictoryAxis dependentAxis />
            <VictoryLine data={this.state.data} x={"time"} y={["value", "0"]} />
          </VictoryChart>
        )}
      </div>
    );
  }
}
