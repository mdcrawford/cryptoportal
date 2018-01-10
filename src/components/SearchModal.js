import React, { Component } from "react";
import { Modal, Select, Button } from "antd";
import currencies from "../data/currencies.js";

/* PROPS
  searchParams: [obj], each has field "currency" and "timeframe"
  updateParent: function, updates the state back in App.js as we add/remove
    search parameters
  isVisible: boolean, whether or not the Modal is being displayed
*/

/* STATE
  searchParams: [obj], starts as copy of the parent's props, changes within Modal
    but changes in parent shouldn't be reflected until hitting the "Submit" button
*/

export default class SearchModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchParams: this.props.searchParams
    };
  }

  addGraph() {
    let updatedParams = this.state.searchParams;
    updatedParams.push({
      currency: "Bitcoin",
      timeframe: 1
    });
    this.setState({
      ...this.state,
      searchParams: updatedParams
    });
  }

  onCloseModal() {
    // TODO
  }

  onSubmitModal() {
    // update the parent's state, first updating the search params...
    this.props.updateParent("searchParams", this.state.searchParams);
    // ...and then isModalVisible to close the Modal
    this.props.updateParent("isModalVisible", false);
  }

  updateParamsInState(field, index, newValue) {
    let updatedParams = this.state.searchParams;
    updatedParams[index][field] = newValue;
    this.setState({
      ...this.state,
      searchParams: updatedParams
    });
  }

  render() {
    const currencyOptions = currencies.map(cur => {
      return (
        <Select.Option key={cur} value={cur}>
          {cur}
        </Select.Option>
      );
    });

    const allDropdowns = this.state.searchParams.map((param, index) => {
      return (
        <div>
          <Select
            style={{ width: "200px" }}
            showSearch
            placeholder="Select a cryptocurrency."
            onChange={val => this.updateParamsInState("currency", index, val)}
            value={param.currency}
          >
            {currencyOptions}
          </Select>

          <Select
            style={{ width: "200px" }}
            showSearch
            placeholder="Select a timeframe."
            onChange={val => this.updateParamsInState("timeframe", index, val)}
            value={param.timeframe}
          >
            <Select.Option value={1} key="day">
              {" "}
              Past Day{" "}
            </Select.Option>
            <Select.Option value={6} key="week">
              {" "}
              Past Week{" "}
            </Select.Option>
            <Select.Option value={30} key="month">
              {" "}
              Past Month{" "}
            </Select.Option>
          </Select>
        </div>
      );
    });

    return (
      <Modal
        visible={this.props.isVisible}
        onOk={() => this.onSubmitModal()}
        onCancel={() => this.props.updateParent("isModalVisible", false)}
        destroyOnClose
      >
        {allDropdowns}
        <Button icon="plus" onClick={() => this.addGraph()} />
      </Modal>
    );
  }
}
