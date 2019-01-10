import React, { Component } from "react";
import { Button } from "antd";

const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls"].map(function (x) { return "." + x; }).join(",");

/**
 * 导入数据页
 */
export default class ImportData extends Component {
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
    const { onChangeFile } = this.props
    return (
      <div className="import-data-container">
        <div className="import-data">
          <Button type="primary" size="large">
            点击导入抽奖名单
            <input className="import-file" type="file" accept={SheetJSFT} onChange={this.onChangeFile} />
          </Button>
        </div>
      </div>
    )
  }
}