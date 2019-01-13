import React, { Component } from "react";
import { Button, message } from "antd";
import UserDetailList from "components/user-detail-list/user-detail-list"
import './random-shake.less';

/**
 * 生成随机数据组件（用于抽奖）
 */
export default class RandomShake extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultData: [],
      luckydrawStatus: null  //  -1：未开始；0：暂停；1：开始
    }
    this.timer = null
    this.random = null
  }

  //  开始/停止抽奖
  handleStart = () => {
    const { data, remainNum } = this.props;
    let { luckydrawStatus } = this.state;
    if (remainNum <= 0) {
      return;
    }

    if (data.length < 2) {
      message.warning('人数不足！')
      return
    }

    if (!luckydrawStatus) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        this.random = parseInt(Math.random() * data.length - 1) + 1;
        this.setState({
          resultData: data[this.random]
        });
      });
    } else {
      clearInterval(this.timer);
      this.props.resultCallBack(this.state.resultData, this.random);
    }
    this.setState({
      luckydrawStatus: !luckydrawStatus
    })
  }

  render() {
    let { resultData, luckydrawStatus } = this.state;
    return (
      <div className="random-container">
        <UserDetailList data={resultData} />
        <Button className="start" size="large" onClick={this.handleStart}>{luckydrawStatus && luckydrawStatus !== null ? '停止' : '开始'}抽奖</Button>
      </div>
    )
  }
}