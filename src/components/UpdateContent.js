import React, { Component } from "react";

class UpdateContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.data.id,
      title: this.props.data.title,
      desc: this.props.data.desc,
    };

    this.inputFormHandler = this.inputFormHandler.bind(this);
  }
  inputFormHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
      //지금 이 함수가 호출된 target의 태그 이름에 따라서
      //어떤 value를 받을지 결정해줄 수 있게 된다.
    });
  }
  render() {
    return (
      <article>
        <h2>Update</h2>
        <form
          action="/create_process"
          method="post"
          onSubmit={function (e) {
            e.preventDefault();
            //this.props.onSubmit(e.target.title.value, e.target.desc.value);
            //이 onSubmit은 App.js의 CreateContent component의 props이다.

            this.props.onSubmit(
              this.state.id,
              this.state.title,
              this.state.desc
            );
            alert("Submit");
          }.bind(this)}
        >
          <input type="hidden" name="id" value={this.state.id}></input>
          <p>
            <input
              type="text"
              name="title"
              placeholder="title"
              value={this.state.title}
              onChange={this.inputFormHandler}
            ></input>
          </p>
          <p>
            <textarea
              name="desc"
              placeholder="description"
              value={this.state.desc}
              onChange={this.inputFormHandler}
            ></textarea>
          </p>
          <p>
            <input type="submit"></input>
          </p>
        </form>
      </article>
    );
  }
}

export default UpdateContent;
