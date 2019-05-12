import React, { Component } from "react";
import { connect } from "react-redux";
// import { Input, Button, message } from "antd";
import XLSX from "xlsx";
import { setSheetHeadNameIndex, saveImportSheetData, createLuckyDrawData, clearCurrentPrizeData } from "srcredux/lucky-redux"
import Phaser from "components/phaser/phaser"

const SheetJSFT = ["xlsx", "xlsb", "xlsm", "xls"].map(function (x) { return "." + x; }).join(","),
  makeCols = Symbol('makeCols'),
  prize = { prizeLevel: '', prizeName: '', prizeNum: '' }


/**
 * first commit
 */



/**
 * 创建抽奖名组件
 */
class CreateLuckyDrawName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      luckyDrawName: '',
      luckyContent: [
        { ...prize, id: +new Date }
      ],
      data: []
    }
  }

  //  输入抽奖名称
  onChangeLuckyName = (e) => {
    this.setState({
      luckyDrawName: e.target.value
    })
  }

  //  导入抽奖名单
  onChangeFile = (e) => {
    let file = e.target.files[0];
    const reader = new FileReader();
    const rABS = !!reader.readAsBinaryString;
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: rABS ? 'binary' : 'array' });
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
      if (data.length === 0) {
        // message.warning('没有数据，请重新导入！')
        return;
      }
      let isName = data[0].some((item, index) => {
        if (item === '姓名' || item === '名字') {
          this.props.setSheetHeadNameIndex(index)
        }
        return item === '姓名' || item === '名字';
      })
      if (!isName) {
        // message.warning('导入的数据没有姓名或名字！');
        return;
      }
      this.setState({
        data: data,
        cols: this[makeCols](ws['!ref'])
      });
      // message.success('导入数据成功！');
    };
    if (rABS) reader.readAsBinaryString(file); else reader.readAsArrayBuffer(file);
  }

  [makeCols] = refstr => {
    let o = [], C = XLSX.utils.decode_range(refstr).e.c + 1;
    for (var i = 0; i < C; ++i) o[i] = { name: XLSX.utils.encode_col(i), key: i }
    return o;
  };

  //  渲染奖级、奖品名、个数  内容
  createluckyContent = () => {
    let { luckyContent } = this.state;
    return luckyContent.map((item, index) => {
      return <Phaser className="phaser-content" data={luckyContent} key={item.id} index={index} onChangeAdd={this.onChangeAdd} onChangeMove={this.onChangeMove}>
        <input placeholder="请输入奖级" onChange={(e) => this.onChangeContent(e, index, 'prizeLevel')} />
        <input placeholder="请输入奖品名称" onChange={(e) => this.onChangeContent(e, index, 'prizeName')} />
        <input placeholder="请输入奖级数量" onChange={(e) => this.onChangeContent(e, index, 'prizeNum')} />
      </Phaser>
    });
  }

  //  新增奖级内容
  onChangeAdd = () => {
    let { luckyContent } = this.state;
    luckyContent.push({ ...prize, id: +new Date });
    this.setState({
      luckyContent
    })
  }

  //  移除奖级内容
  onChangeMove = (e, index) => {
    let { luckyContent } = this.state;
    luckyContent.splice(index, 1);
    this.setState({
      luckyContent
    })
  }

  //  抽奖内容change
  onChangeContent = (e, index, type) => {
    let { luckyContent } = this.state;
    luckyContent[index][type] = e.target.value;
    this.setState({
      luckyContent
    })
  }

  createLuckyDraw = () => {
    let { data, luckyContent, luckyDrawName } = this.state;
    const { createLuckyDraw, saveImportSheetData, createLuckyDrawData } = this.props;
    if (!luckyDrawName) {
      // message.warning('请输入抽奖名称！')
      return
    }
    for (let i = 0; i < luckyContent.length; i++) {
      let item = luckyContent[i];
      for (let cur in item) {
        if (!item[cur]) {
          // message.warning('奖级、奖品名、数量不能为空！')
          return
        }
      }
    }
    if (data.length <= 0) {
      // message.warning('请导入数据！')
      return
    }
    let luckyData = {
      luckyDrawName,
      luckyContent
    }
    saveImportSheetData(data)
    createLuckyDrawData(luckyData)
    //  创建前清空之前本地缓存数据
    this._clearData()
    createLuckyDraw()
  }

  //  清空数据
  _clearData = () => {
    localStorage.removeItem('lucky')
    localStorage.removeItem('export-prizet-data')
    this.props.clearCurrentPrizeData()
  }

  render() {
    const { hanlderMovePage } = this.props;
    return (
      <div className="create-lucky-draw-container">
        <div className="create-lucky-draw center-warpper">
          <h3 className="title">创建抽奖</h3>
          <ul className="form-list">
            <li className="lucky-draw-name">
              <label htmlFor="">名称：</label>
              <input placeholder="请输入创建的抽奖名" onChange={this.onChangeLuckyName} />
            </li>
            <li className="lucky-content">
              <label htmlFor="">内容：</label>
              <div className="lucky-content-warpper">
                {this.createluckyContent()}
              </div>
            </li>
            <li className="import-data">
              <label htmlFor="">导入人员名单：</label>
              <button type="primary">
                点击导入
                <input className="import-file" type="file" accept={SheetJSFT} onChange={this.onChangeFile} />
              </button>
            </li>
          </ul>
          <div className="footer">
            <button type="primary" onClick={() => hanlderMovePage(3)}>前往中奖名单</button>
            <button type="primary" onClick={this.createLuckyDraw}>创建并前往抽奖页</button>
          </div>
        </div>
      </div>
    )
  }
}

export default connect(null, { setSheetHeadNameIndex, saveImportSheetData, createLuckyDrawData, clearCurrentPrizeData })(CreateLuckyDrawName);