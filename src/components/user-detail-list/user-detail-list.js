import React, { Component } from "react";
import './user-detail-list.less'

/**
 * 人员详情
 */
export default class UserDetailList extends Component {
  constructor(props) {
    super(props)
  }

  _createList = () => {
    const { data } = this.props;
    return data.map((item, index) => {
      return <span className="detail-item" key={index}>{item}</span>
    })
  }

  render() {
    const { data } = this.props;
    return (
      <div className="user-detail-list">
        {this._createList()}
      </div>
    )
  }
}