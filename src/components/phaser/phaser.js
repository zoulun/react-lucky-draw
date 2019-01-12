import React, { Component } from "react";
import { Input, Button, Icon } from "antd";
import './phaser.less';

/**
 * 阶段生成器组件
 */
export default class phaser extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { data, onChangeMove, onChangeAdd, className, index } = this.props;
    let i = index + 1;
    return (
      <div className="react-phaser-item">
        <div className={`react-phaser-content ${className}`}>{this.props.children}</div>
        <div className="react-phaser-btn-group">
          {
            i !== data.length &&
            < Icon className="move" theme="filled" type="minus-circle" onClick={(e) => onChangeMove(e, index)} />
          }
          {
            i === data.length &&
            <Icon className="add" theme="filled" type="plus-circle" onClick={onChangeAdd} />
          }
        </div>
      </div>
    )
  }
}