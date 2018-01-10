import React, { Component } from "react";
import { VictoryLine, VictoryChart } from "victory";

/* PROPS
  data: [obj], the array pulled from the API call's results.default.timelineData
*/

export default class Graph extends Component {
  render() {
    return (
      <VictoryChart>
        <VictoryLine data={this.props.data} x={"time"} y={["value", "0"]} />
      </VictoryChart>
    );
  }
}
