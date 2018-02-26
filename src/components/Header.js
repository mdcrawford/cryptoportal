import React, { Component } from "react";
import { Button, Menu, Icon } from "antd";
import { Link } from "react-router-dom";
import signOutFirebase from "../firebase/signOutFirebase.js";

/* PROPS
  isLoggedIn: boolean, whether or not to render the sign out button
*/

export default class Header extends Component {
  render() {
    if (!this.props.isLoggedIn) {
      return <div />;
    }

    return (
      <div>
        <Menu mode="horizontal">
          <Menu.Item>
            <Link to="/viewgraphs"> View Graphs </Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/addcoin">Add Coin</Link>
          </Menu.Item>

          <Menu.Item>
            <Link to="/changepassword"> Change Password </Link>
          </Menu.Item>

          <Menu.Item>
            {this.props.isLoggedIn && (
              <Button onClick={() => signOutFirebase()}> Sign Out </Button>
            )}
          </Menu.Item>
        </Menu>
      </div>
    );
  }
}
