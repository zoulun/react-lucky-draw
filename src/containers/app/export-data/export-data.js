import React, { Component } from "react";
import { message, Button, Select } from "antd";
import XLSX from "xlsx";

const Option = Select.Option;

/**
 * 导出抽奖
 */
export default class ExportData extends Component {
  constructor(props) {
    super(props)
  }

   /**
   * 导出数据
   */
  hanlderExportData = () => {
    let { data } = this.props;
    if (data.length) {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, "中奖名单.xlsx");
    } else {
      message.warning('没有可导入的数据！');
    }
  }

  render() {
    const { hanlderMovePage } = this.props
    return (
      <div className="export-data-container">
        <div className="center-warpper">
          <h3 className="title">导出中奖</h3>
          <ul className="form-list">
            <li className="lucky-draw-name">
              <label htmlFor="">抽奖名称</label>
              <Select style={{ width: '200px' }} placeholder="选择抽奖名">
                <Option value="0">抽奖名称1</Option>
                <Option value="1">抽奖名称2</Option>
                <Option value="2">抽奖名称3</Option>
                <Option value="3">抽奖名称4</Option>
              </Select>
            </li>
            <li className="import-data">
              <label htmlFor="">奖级：</label>
              <Select style={{ width: '200px' }} placeholder="选择奖级">
                <Option value="0">全部</Option>
                <Option value="1">一等奖</Option>
                <Option value="2">二等奖</Option>
                <Option value="3">三等奖</Option>
              </Select>
            </li>
          </ul>
          <div className="footer">
            <Button type="primary" onClick={() => hanlderMovePage(1)}>返回</Button>
            <Button type="primary" onClick={this.hanlderExportData}>点击导出中奖名单</Button>
          </div>
        </div>
      </div>
    )
  }
}