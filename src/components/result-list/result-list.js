import React, { Component } from "react";
import './result-list.less';

/**
 * 结果列表
 */
export default class ResultList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    let { data } = this.props;
    return (
      <div className="len-result-list">
        <h3 className="title">{data.prizeLevel}</h3>
        <ul className="content-list">
          {
            data.content.map((item, index) => {
              return <li key={index}>{item}</li>
            })
          }
        </ul>
      </div>
    )
  }
}