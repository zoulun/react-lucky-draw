import React, { Component } from "react";
import { Popover } from "antd";
import { themeData } from "lib/js/default-public"
import './theme-style.less'

/**
 * 主题
 */
export default class ThemeStyle extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { className = 'len-tj-theme' } = this.props
    return (
      <div className="len-theme-style-container">
        <div className={`theme-style-content ${className}`}>
          <div className="circle-left"></div>
          <div className="circle-right"></div>
        </div>
      </div>
    )
  }
}