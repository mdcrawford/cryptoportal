import React, { Component } from "react";
import { Input, Button } from "antd";
import loginToFirebase from "../firebase/loginToFirebase.js";

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  onInputChange(field, value) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  render() {
    return (
      <div>
        <Input
          value={this.state.email}
          onChange={e => this.onInputChange("email", e.target.value)}
          style={{ width: 250 }}
          placeholder="Email"
        />

        <br />

        <Input
          value={this.state.password}
          onChange={e => this.onInputChange("password", e.target.value)}
          type="password"
          style={{ width: 250 }}
          placeholder="Password"
        />

        <br />

        <Button
          type="primary"
          onClick={() => loginToFirebase(this.state.email, this.state.password)}
        >
          {" "}
          Log In{" "}
        </Button>
      </div>
    );
  }
}
