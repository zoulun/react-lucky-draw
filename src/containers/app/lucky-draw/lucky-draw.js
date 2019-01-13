import React, { Component } from "react";
import { connect } from "react-redux";
import { Radio, Button, Drawer } from "antd";
import XLSX from "xlsx";
import RandomShake from 'components/random-shake/random-shake';
import ResultList from "components/result-list/result-list"
import { setPrizeList, saveImportSheetData, saveExportPrizetData, clearCurrentPrizeData } from "srcredux/lucky-redux"

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
      visibleResult: false
    }
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
    saveImportSheetData(tempExportData)
    let exportData = [...exportPrizetData, [...data, currentPrize.prizeLevel, currentPrize.prizeName]]
    saveExportPrizetData(exportData)
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
    let { importSheetData, exportPrizetData, luckyDrawData } = this.props;
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
          </div>
          <Button type="primary" onClick={this.clearData}>清空数据</Button>
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
  { setPrizeList, saveImportSheetData, saveExportPrizetData, clearCurrentPrizeData }
)(LuckyDraw)