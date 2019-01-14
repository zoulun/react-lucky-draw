import React, { Component } from "react";
import { connect } from "react-redux";
import { Radio, Button, Drawer, message } from "antd";
import XLSX from "xlsx";
import RandomShake from 'components/random-shake/random-shake';
import ResultList from "components/result-list/result-list"
import { setPrizeList, saveImportSheetData, saveExportPrizetData, clearCurrentPrizeData, saveLuckyList } from "srcredux/lucky-redux"

/**
 * 抽奖页组件
 */
class LuckyDraw extends Component {
  constructor(props) {
    super(props)
    const { luckyContent } = this.props.luckyDrawData
    this.state = {
      currentPrize: luckyContent[luckyContent.length - 1],
      winners: {},
      visibleResult: false,
    }
    this.luckyId = new Date().getTime()
  }

  //  奖级列表
  _createPrizeList = () => {
    const { luckyDrawData } = this.props;
    return luckyDrawData.luckyContent.map((item, index) => {
      return <Radio.Button key={item.id} value={item.prizeLevel}>{item.prizeLevel}</Radio.Button>
    })
  }

  //  切换奖级
  _onChangePrizeLevel = (e) => {
    const { luckyDrawData } = this.props;
    let currentPrize = luckyDrawData.luckyContent.find((item, index) => {
      return item.prizeLevel === e.target.value
    })
    this.setState({
      currentPrize
    })
  }

  //  抽奖结果，存入本地缓存
  handleLuckyDrawResult = (data, index) => {
    const { sheetNameIndex, importSheetData, exportPrizetData, setPrizeList, saveImportSheetData, saveExportPrizetData } = this.props;
    let { currentPrize } = this.state;
    let localStg = []
    let newLocalStg = localStorage.getItem('lucky');
    currentPrize.prizeNum -= 1;
    if (!newLocalStg) {
      let dataItem = {
        id: currentPrize.id,
        prizeLevel: currentPrize.prizeLevel,
        content: [data[sheetNameIndex]]
      }
      localStg.push(dataItem)
    } else {
      localStg = JSON.parse(newLocalStg)
      let localIndex = localStg.findIndex((item) => {
        return item.prizeLevel === currentPrize.prizeLevel
      })
      if (localIndex > -1) {
        localStg[localIndex].content.push(data[sheetNameIndex])
      } else {
        let dataItem = {
          id: currentPrize.id,
          prizeLevel: currentPrize.prizeLevel,
          content: [data[sheetNameIndex]]
        }
        localStg.push(dataItem)
      }
    }
    let tempExportData = JSON.parse(JSON.stringify(importSheetData))
    tempExportData.splice(index, 1)
    //  已抽过的人员移除后重新写入redux
    saveImportSheetData(tempExportData)
    let exportData = [...exportPrizetData, [...data, currentPrize.prizeLevel, currentPrize.prizeName]]
    //  当前中奖名单存入redux（最终导出的名单列表）
    saveExportPrizetData(exportData)
    //  中奖列表
    setPrizeList(localStg)
    localStorage.setItem('lucky', JSON.stringify(localStg))
    localStorage.setItem('export-prizet-data', JSON.stringify(exportData))
    this.setState({
      currentPrize
    })
  }

  //  清空数据
  clearData = () => {
    localStorage.removeItem('lucky')
    localStorage.removeItem('export-prizet-data')
    this.props.clearCurrentPrizeData()
    message.success('成功清空数据！')
  }

  //  显示抽奖结果面板
  handleResultPanelStatus = () => {
    this.setState({
      visibleResult: !this.state.visibleResult
    })
  }

  //  生成抽奖结果列表组件
  _createResultList = () => {
    let { prizeList } = this.props;

    //  按照创建时候的顺序排序
    let arr = JSON.parse(JSON.stringify(prizeList))
    arr.sort((a, b) => {
      console.log()
      return a.id > b.id
    })
    return arr.map((item, index) => {
      return <ResultList key={index} data={item} />
    })
  }

  //  导出
  handleExport = () => {
    const { importSheetData, exportPrizetData, luckyDrawData } = this.props;
    let data = JSON.parse(JSON.stringify(exportPrizetData))
    let sheetHead = [...importSheetData[0], '奖级', '奖品']
    data.unshift(sheetHead)
    if (data.length > 1) {
      const ws = XLSX.utils.aoa_to_sheet(data);
      const wb = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
      XLSX.writeFile(wb, `${luckyDrawData.luckyDrawName}中奖名单.xlsx`);
    } else {
      message.warning('没有可导入的数据！');
    }
  }

  //  保存抽奖数据，可在导出页面选择导出
  saveLuckyData = () => {
    const { luckyDrawData, importSheetData, exportPrizetData, saveLuckyList } = this.props;
    let obj = {
      id: this.luckyId,
      luckyDrawName: luckyDrawData.luckyDrawName,
      lucky: [[...importSheetData[0], '奖级', '奖品'], ...exportPrizetData]
    }
    let luckyList = JSON.parse(localStorage.getItem('lucky-list') || '[]')
    if (luckyList.length) {
      let currentIndex = luckyList.findIndex((item, index) => {
        return item.id === this.luckyId
      })
      if (currentIndex > -1) {
        luckyList[currentIndex] = obj
      } else {
        luckyList.push(obj)
      }
    } else {
      luckyList.push(obj)
    }

    saveLuckyList(luckyList)
    localStorage.setItem('lucky-list', JSON.stringify(luckyList))
    message.success('保存成功！')
  }

  render() {
    const { luckyDrawData, importSheetData, hanlderMovePage } = this.props;
    let { currentPrize, luckydrawStatus, visibleResult } = this.state;
    return (
      <div className="lucky-draw-container">
        <div className="lucky-draw-warpper">
          <h1 className="lucky-draw-title">{luckyDrawData.luckyDrawName}</h1>
        </div>
        <div className="prize-list">
          <Radio.Group defaultValue={currentPrize.prizeLevel} buttonStyle="solid" onChange={this._onChangePrizeLevel}>
            {this._createPrizeList()}
          </Radio.Group>
        </div>
        <div className="lucky-draw-content">
          <p className="prize-name">{currentPrize.prizeName}</p>
          <p className="prize-num">剩余名额：{currentPrize.prizeNum}</p>
          <RandomShake data={importSheetData} remainNum={currentPrize.prizeNum} status={luckydrawStatus} resultCallBack={this.handleLuckyDrawResult} />
        </div>
        <div className="lucky-draw-footer">
          <Button className="back" type="primary" onClick={(e) => hanlderMovePage(1)}>返回</Button>
          <div className="footer-center">
            <Button type="primary" size="large" onClick={this.handleResultPanelStatus}>抽奖结果</Button>
            <Button type="primary" size="large" onClick={this.saveLuckyData}>保存抽奖模板数据</Button>
            <span style={{ color: 'red' }}>可在导出页面查询</span>
          </div>
          <Button type="primary" onClick={this.clearData}>清除当前抽奖数据</Button>
        </div>
        {
          visibleResult &&
          <Drawer
            className="result-panel"
            title="抽奖结果"
            visible={visibleResult}
            onClose={this.handleResultPanelStatus}
          >
            {this._createResultList()}
            <div className="panel-footer">
              <Button type="primary" onClick={this.handleExport}>导出</Button>
            </div>
          </Drawer>
        }
      </div>
    )
  }
}

export default connect(
  state => state.lucky,
  { setPrizeList, saveImportSheetData, saveExportPrizetData, clearCurrentPrizeData, saveLuckyList }
)(LuckyDraw)