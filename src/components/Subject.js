import React, { Component } from "react";

class Subject extends Component {
  //component를 만들 때는 반드시 하나의 최상위 태그만 넣어야 한다.
  render() {
    return (
      <header>
        <h1>
          <a
            href="/"
            onClick={function (e) {
              e.preventDefault();
              this.props.onChangePage();
            }.bind(this)}
          >
            {this.props.title}
          </a>
        </h1>
        {this.props.sub}
      </header>
    );
  }
}

export default Subject;
