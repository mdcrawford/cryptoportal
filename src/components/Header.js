import React, { Component } from "react";
import { Button } from "antd";
import signOutFirebase from "../firebase/signOutFirebase.js";

/* PROPS
  isLoggedIn: boolean, whether or not to render the sign out button
*/

export default class Header extends Component {
  render() {
    return (
      <div>
        {this.props.isLoggedIn && (
          <Button onClick={() => signOutFirebase()}> Sign Out </Button>
        )}
      </div>
    );
  }
}
