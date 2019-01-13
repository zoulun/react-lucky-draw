import React, { Component } from "react";
import { Popover } from "antd";
import './theme-style.less'

/**
 * 主题
 */
export default class ThemeStyle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="len-theme-style-container">
        <div className="circle-left"></div>
        <div className="circle-right"></div>
      </div>
    )
  }
}