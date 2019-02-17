import React, { Component } from "react";
import { connect } from 'react-redux';
import CreateLuckyDraw from "./create-lucky-draw/create-lucky-draw";
import LuckyDraw from "./lucky-draw/lucky-draw";
import ExportDate from "./export-data/export-data";
import ThemeStyle from "components/theme-style/theme-style";
import "./app.less";
import { hot } from "react-hot-loader";

/**
 * 抽奖首页
 */
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      steps: 1
    }
  }

  /**
   * 跳转页
   */
  hanlderMovePage = (steps) => {
    this.setState({
      steps
    })
  }

  //  创建抽奖
  createLuckyDraw = () => {
    this.setState({
      steps: 2
    })
  }

  render() {
    let { steps } = this.state;
    return (
      <div className="app">
        <div className="app-container">
          {
            steps === 1 &&
            <CreateLuckyDraw
              createLuckyDraw={this.createLuckyDraw}
              hanlderMovePage={this.hanlderMovePage}
            />
          }
          {
            steps === 2 && <LuckyDraw
              hanlderMovePage={this.hanlderMovePage}
            />
          }
          {
            steps === 3 && <ExportDate
              hanlderMovePage={this.hanlderMovePage}
            />
          }
          {/* <ThemeStyle /> */}
        </div>
      </div>
    )
  }
}

// const hotApp = hot(module)(App)
export default hot(module)(App);
// export default connect()(hot(module)(App))