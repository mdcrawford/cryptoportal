import React, { Component } from "react";
import { Redirect } from "react-router";
import { Input, Button } from "antd";
import updatePassword from "../firebase/updatePassword";

export default class ChangePassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newPassword: "",
      newPasswordAgain: ""
    };
  }

  onChange(field, value) {
    this.setState({
      ...this.state,
      [field]: value
    });
  }

  onClickChangePassword() {
    if (this.state.newPassword !== this.state.newPasswordAgain) {
      alert("ERROR: Make sure both passwords are the same.");
    } else {
      updatePassword(this.state.newPassword);
    }
  }

  render() {
    if (!this.props.userInfo) {
      return <Redirect to="/" />;
    }

    return (
      <div>
        <p> New Password: </p>
        <Input
          style={{ width: 250 }}
          onChange={e => this.onChange("newPassword", e.target.value)}
          value={this.state.newPassword}
          type="password"
        />

        <br />
        <br />

        <p> New Password Again: </p>
        <Input
          style={{ width: 250 }}
          onChange={e => this.onChange("newPasswordAgain", e.target.value)}
          value={this.state.newPasswordAgain}
          type="password"
        />

        <br />
        <br />

        <Button onClick={() => this.onClickChangePassword()}>
          {" "}
          Change Password{" "}
        </Button>
      </div>
    );
  }
}
