import React, { Component } from "react";
import { connect } from "react-redux";
import { message, Button, Select } from "antd";
import XLSX from "xlsx";

const Option = Select.Option;

/**
 * 导出抽奖
 */
class ExportData extends Component {
  constructor(props) {
    super(props)
    this.state = {
      currentSelectData: null
    }
    this.luckyList = JSON.parse(localStorage.getItem('lucky-list') || '[]')
  }

  //  生成抽奖列表
  createLuckyList = () => {
    return this.luckyList.map((item, index) => {
      return <Option key={item.id} value={item.id}>{item.luckyDrawName}</Option>
    })
  }

  //  选择需要导出的抽奖模块
  onChangeSelect = (value) => {
    let data = this.luckyList.find((item, index) => {
      return item.id === value
    })
    this.setState({
      currentSelectData: data
    })
  }

  /**
  * 导出数据
  */
  hanlderExportData = () => {
    let { currentSelectData } = this.state;
    if (currentSelectData) {
      const ws = XLSX.utils.aoa_to_sheet(currentSelectData.lucky);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, `${currentSelectData.luckyDrawName}中奖名单.xlsx`);
    } else {
      message.warning('请先选择要导出的模块！');
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
              <label htmlFor="">抽奖列表</label>
              <Select style={{ width: '200px' }} placeholder="选择抽奖名" onChange={this.onChangeSelect}>
                {this.createLuckyList()}
              </Select>
            </li>
            {/* <li className="import-data">
              <label htmlFor="">奖级：</label>
              <Select style={{ width: '200px' }} placeholder="选择奖级">
                <Option value="0">全部</Option>
                <Option value="1">一等奖</Option>
                <Option value="2">二等奖</Option>
                <Option value="3">三等奖</Option>
              </Select>
            </li> */}
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

export default connect(
  state => state.lucky,
)(ExportData)