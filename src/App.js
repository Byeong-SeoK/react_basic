import React, { Component } from "react";
import TOC from "./components/TOC";
import ReadContent from "./components/ReadContent";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import "./App.css";

class App extends Component {
  constructor(props) {
    //컴포넌트 및 props를 초기화하는 것이다.
    super(props);
    this.max_content_id = 3;
    //UI에게 하등 영향을 주지 않지만, 이용해야하는 값은
    //굳이 state 객체 내에 저장할 필요가 없다.
    this.state = {
      mode: "welcome", //해당 페이지가 읽기 페이지인지 아닌 페이지인지 구분을 위한 값
      selected_content_id: 1,
      subject: { title: "WEB", sub: "world wide web!" },
      //이렇게 state를 초기화하고 값을 넣어줄 수 있다.
      welcome: { title: "Welcome", desc: "Hello, React" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information." },
        { id: 2, title: "CSS", desc: "CSS is for design." },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive." },
      ],
    };
  }

  getReadContent() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (this.state.selected_content_id === data.id) {
        return data;
      }
      i = i + 1;
    }
  }

  getContent() {
    var _title,
      _desc,
      _article,
      _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc}></ReadContent>;
    } else if (this.state.mode === "read") {
      _content = this.getReadContent();
      _article = (
        <ReadContent title={_content.title} desc={_content.desc}></ReadContent>
      );
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            this.max_content_id = this.max_content_id + 1;
            // this.state.contents.push({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });

            //push를 사용하는 다른 올바른 방법
            // var newContents = Array.from(this.state.contents);
            // newContents.push({
            //   id: this.max_content_id,
            //   title: _title,
            //   desc: _desc,
            // });
            // this.setState({
            //   contents: newContents,
            // });

            var _contents = this.state.contents.concat({
              id: this.max_content_id,
              title: _title,
              desc: _desc,
            });
            this.setState({
              contents: _contents,
              mode: "read",
              selected_content_id: this.max_content_id,
            });
            //위에서 contents 객체에 새로운 값을 추가한다.
            //하지만, 직접적으로 state값을 수정하면 react는 그 변화를 감지하지 못한다.
            //그래서 직접 수정된 새로운 state 객체를 기존의 state의 contents가 되도록
            //setState를 통해서 값을 변경할 수 있도록 한다.
            //다만 push를 이용하는 방법은 향후 유지보수하기 어렵다.
          }.bind(this)}
        ></CreateContent>
      );
    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <UpdateContent
          data={_content}
          onSubmit={function (_id, _title, _desc) {
            var _contents = Array.from(this.state.contents);
            var i = 0;
            while (i < _contents.length) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
              i = i + 1;
            }
            this.setState({
              contents: _contents,
              mode: "read",
            });
          }.bind(this)}
        ></UpdateContent>
      );
    }

    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({ mode: "welcome" });
          }.bind(this)}
          //이때 onChangePage함수는 Subject의 props에 해당한다.
          //그래서 onChangePage의 익명함수는 Subject.js로 props로 전달된다.
        ></Subject>

        {/* <header>
          <h1>
            <a
              href="/"
              onClick={function (e) {
                //이 onClick에 의해 호출되는 익명함수는 / 라는 링크가
                //클릭되었을 때 호출되어 실행되는 함수이다.
                //다만 이때 해당 함수의 로직이 끝나면 /에 위치한 페이지가 리로드 된다.
                //이를 막기 위해서는 이벤트를 handling하는 객체가 필요한데 이 역할을 하는 것이
                //해당 익명함수의 파라미터로 넘긴 e가 된다. 즉, e가 이벤트 객체라 보면 된다.

                //this.state.mode = "welcome";
                //위 코드는 오류를 발생시킨다.
                //왜냐하면 이 익명함수 내에서 this는 그 어떠한 것도 가르키지 않기 때문이다.

                e.preventDefault(); //페이지의 reload를 막아준다.

                //this.state.mode = "welcome";
                this.setState({
                  mode: "welcome",
                });
                //이를 통해서 해당 이벤트 객체 내에서도 컴포넌트의 state를 지정할 수 있다.

                console.log(e);
                //debugger;
                //이 debugger를 달아놓음으로써 크롬 개발자 도구의 sources로 자동으로 넘어가
                //해당 페이지의 코드나 상태 등을 확인할 수 있다.
                //여타 다른 idle의 디버깅 역할을 코드에 직접 입력하는 것이라 보면 된다.
              }.bind(this)}
              //bind(this)를 통해서 이벤트 함수 내에서 this가 컴포넌트 this와 묶일 수 있게 해준다.
            >
              {this.state.subject.title}
            </a>
          </h1>
          {this.state.subject.sub}
        </header> */}

        <TOC
          onChangePage={function (id) {
            //debugger;
            this.setState({ mode: "read", selected_content_id: Number(id) });
          }.bind(this)}
          data={this.state.contents}
        ></TOC>

        <Control
          onChangeMode={function (_mode) {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                //confirm함수를 통해서 사용자가 진짜 의도한 행위가 맞는지 받을 수 있다.
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  i = i + 1;
                }
                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
                alert("deleted!");
              }
            } else {
              this.setState({
                mode: _mode,
              });
            }
          }.bind(this)}
        ></Control>

        {this.getContent()}
      </div>
    );
  }
}

export default App;
