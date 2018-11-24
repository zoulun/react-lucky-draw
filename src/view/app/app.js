import React, { Component } from "react";
import XLSX from "xlsx";
import CreateLuckyDraw from "./create-lucky-draw/create-lucky-draw";
import LuckyDraw from "./lucky-draw/lucky-draw";
import ExportDate from "./export-data/export-data";
import { message } from "antd";

import "./app.less";
import { hot } from "react-hot-loader";

/**
 * 抽奖首页
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      luckyDrawName: '',
      steps: 1
    }
  }

  /**
   * 输入抽奖名称
   */
  onChangeLuckyName = (e) => {
    console.log(e.target.value)
    this.setState({
      luckyDrawName: e.target.value
    })
  }

  /**
     * 导入抽奖名单
     */
  onChangeFile = (file) => {
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      this.setState({
        data: data,
        cols: this.make_cols(ws['!ref'])
      }, () => {
        console.log(this.state.data);
        let { data } = this.state;
        data.length > 2 && data.pop();
        this.setState({
          data
        });
      });
      message.success('导入数据成功！');
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  make_cols = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
    return o;
  };

  /**
   * 跳转页
   */
  hanlderMovePage = (steps) => {
    this.setState({
      steps
    })
  }

  /**
   * 导出数据
   */
  hanlderExportData = () => {
    let { data } = this.state;
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
    let { data, luckyDrawName, steps } = this.state;
    return (
      <div className="app">
        {
          steps === 1 &&
          <CreateLuckyDraw
            data={data}
            onChangeFile={this.onChangeFile}
            onChangeLuckyName={this.onChangeLuckyName}
            luckyDrawName={luckyDrawName}
            hanlderMovePage={this.hanlderMovePage}
          />
        }
        {
          steps === 2 && <LuckyDraw />
        }
        {
          steps === 3 && <ExportDate
            data={data}
            hanlderExportData={this.hanlderExportData}
            hanlderMovePage={this.hanlderMovePage}
          />
        }
      </div>
    )
  }
}

export default hot(module)(App);