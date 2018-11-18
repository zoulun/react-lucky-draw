import React, { Component } from "react";
import { Input, Button } from "antd";

/**
 * 抽奖页组件
 */
export default class CreateLuckyDrawName extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { hanlderMoveExport } = this.props;
    return (
      <div className="lucky-draw-container">
        <div className="lucky-draw-warpper">
          <h1 className="lucky-draw-title">抽奖页</h1>
        </div>
      </div>
    )
  }
}