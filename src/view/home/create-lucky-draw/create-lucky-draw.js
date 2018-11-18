import React, { Component } from "react";
import { Input, Button } from "antd";

const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls"].map(function (x) { return "." + x; }).join(",");

/**
 * 创建抽奖名组件
 */
export default class CreateLuckyDrawName extends Component {
  constructor(props) {
    super(props)
  }

  /**
   * 导入抽奖名单
   */
  onChangeFile = (e) => {
    const { onChangeFile } = this.props,
      files = e.target.files;
    if (files && files[0]) {
      onChangeFile(files[0])
    }
  }

  render() {
    const { data, onChangeLuckyName, luckyDrawName, hanlderMovePage } = this.props;
    let isDisabled = data.length <= 0 || !luckyDrawName;
    return (
      <div className="create-lucky-draw-container">
        <div className="create-lucky-draw center-warpper">
          <h3 className="title">创建抽奖</h3>
          <ul className="form-list">
            <li className="lucky-draw-name">
              <label htmlFor="">抽奖名称：</label>
              <Input placeholder="请输入创建的抽奖名" onChange={onChangeLuckyName} />
            </li>
            <li className="import-data">
              <label htmlFor="">导入人员名单：</label>
              <Button type="primary">
                点击导入
                <input className="import-file" type="file" accept={SheetJSFT} onChange={this.onChangeFile} />
              </Button>
            </li>
          </ul>
          <div className="footer">
            <Button type="primary" onClick={() => hanlderMovePage(2)} disabled={isDisabled}>创建并前往抽奖页</Button>
            <Button type="primary" onClick={() => hanlderMovePage(3)}>前往中奖名单</Button>
          </div>
        </div>
      </div>
    )
  }
}