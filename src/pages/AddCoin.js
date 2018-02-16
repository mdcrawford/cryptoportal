import React, { Component } from "react";
import { Input, Button } from "antd";
import addCoin from "../firebase/addCoin";

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

  onSubmitCoin() {
    if (this.state.coinName && this.state.coinAbbrev) {
      addCoin(this.state.coinName, this.state.coinAbbrev);
    } else {
      alert("Please fill out both the coin name and the coin abbreviation.");
    }
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

        <br />

        <Button onClick={() => this.onSubmitCoin()}> + Add Coin </Button>
      </div>
    );
  }
}
