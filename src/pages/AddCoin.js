import React, { Component } from "react";
import { Input } from "antd";

export default class AddCoin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      coinName: "",
      coinAbbrev: ""
    };
  }

  onChange(field, value) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  render() {
    return (
      <div>
        <p> Coin Name </p>
        <Input
          style={{ width: 250 }}
          value={this.state.coinName}
          onChange={e => this.onChange("coinName", e.target.value)}
          placeholder="Coin Name"
        />

        <br />

        <p> Coin Abbreviation </p>
        <Input
          style={{ width: 250 }}
          value={this.state.coinAbbrev}
          onChange={e => this.onChange("coinAbbrev", e.target.value)}
          placeholder="Coin Abbreviation"
        />
      </div>
    );
  }
}
