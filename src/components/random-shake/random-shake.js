import React, { Component } from "react";
import UserDetailList from "components/user-detail-list/user-detail-list"
import './random-shake.less';

/**
 * 生成随机数据组件（用于抽奖）
 */
export default class RandomShake extends Component {
  constructor(props) {
    super(props)
    this.state = {
      resultData: []
    }
    this.timer = null
  }

  componentWillReceiveProps(nextProps) {
    const { data } = nextProps;
    if (nextProps.status && nextProps.status !== null) {
      clearInterval(this.timer);
      this.timer = setInterval(() => {
        let random = parseInt(Math.random() * data.length - 1) + 1;
        this.setState({
          resultData: data[random]
        });
        // this.props.resultCallBack(data[random]);
      });
    } else {
      clearInterval(this.timer);
    }
  }

  render() {
    let { resultData } = this.state;
    return (
      <div className="random-container">
        <UserDetailList data={resultData} />
      </div>
    )
  }
}