import React, { Component } from "react";
import { Radio, Button } from "antd";
import RandomShake from 'components/random-shake/random-shake'

/**
 * 抽奖页组件
 */
export default class LuckyDraw extends Component {
  constructor(props) {
    super(props)
    const { luckyContent } = this.props.prizeData
    this.state = {
      currentPrize: luckyContent[luckyContent.length - 1],
      winners: {},
      currentResult: [],
      luckydrawStatus: null  //  -1：未开始；0：暂停；1：开始
    }
  }

  //  奖级列表
  _createPrizeList = () => {
    const { prizeData } = this.props;
    return prizeData.luckyContent.map((item, index) => {
      return <Radio.Button key={item.id} value={item.prizeLevel}>{item.prizeLevel}</Radio.Button>
    })
  }

  //  切换奖级
  _onChangePrizeLevel = (e) => {
    const { prizeData } = this.props;
    let currentPrize = prizeData.luckyContent.find((item, index) => {
      return item.prizeLevel === e.target.value
    })
    this.setState({
      currentPrize
    })
  }

  //  结果回调
  // resultCallBack = (res) => {
  //   this.setState({
  //     currentResult: res
  //   })
  // }

  //  开始/停止抽奖
  handleStart = () => {
    const { prizeData } = this.props;
    let { currentPrize, currentResult, luckydrawStatus } = this.state;
    let localStg = []
    if (currentPrize.prizeNum <= 0) {
      return;
    }

    if (luckydrawStatus) {
      currentPrize.prizeNum -= 1;
      let newLocalStg = localStorage.getItem('lucky');
      if (!newLocalStg) {
        let dataItem = {
          prizeLevel: currentPrize.prizeLevel,
          users: [currentResult[0]]
        }
        localStg.push(dataItem)
      } else {
        localStg = JSON.parse(JSON.stringify(newLocalStg))
        for (let i in localStg) {
          if (localStg[i].prizeLevel === currentPrize.prizeLevel) {
            localStg[i].users.push(currentResult[0])
          } else {
            let dataItem = {
              prizeLevel: currentPrize.prizeLevel,
              users: [currentResult[0]]
            }
            localStg.push(dataItem)
          }
        }
      }
      console.log(localStg)
    }
    this.setState({
      currentPrize,
      luckydrawStatus: !luckydrawStatus
    })
  }

  render() {
    const { prizeData, hanlderMovePage } = this.props;
    let { currentPrize, luckydrawStatus } = this.state;
    return (
      <div className="lucky-draw-container">
        <div className="lucky-draw-warpper">
          <h1 className="lucky-draw-title">{prizeData.luckyDrawName}</h1>
        </div>
        <div className="prize-list">
          <Radio.Group defaultValue={currentPrize.prizeLevel} buttonStyle="solid" onChange={this._onChangePrizeLevel}>
            {this._createPrizeList()}
          </Radio.Group>
        </div>
        <div className="lucky-draw-content">
          <p className="prize-name">{currentPrize.prizeName}</p>
          <p className="prize-num">剩余名额：{currentPrize.prizeNum}</p>
          <RandomShake data={prizeData.data} status={luckydrawStatus} resultCallBack={this.resultCallBack} />
          <Button className="start" size="large" onClick={this.handleStart}>{luckydrawStatus && luckydrawStatus !== null ? '停止' : '开始'}抽奖</Button>
        </div>
        <div className="lucky-draw-footer">
          <Button className="back" type="primary" onClick={(e) => hanlderMovePage(1)}>返回</Button>
          <div className="footer-center">
            <Button type="primary" size="large">抽奖结果</Button>
          </div>
        </div>
      </div>
    )
  }
}