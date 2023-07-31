import React, { Component } from "react";

class TOC extends Component {
  // shouldComponentUpdate(newProps, newState) {
  //   console.log(
  //     "==> TOC render shouldComponentUpdate",
  //     newProps.data,
  //     //상위 컴포넌트의 props가 바뀌거나 새로운 것이 생기면
  //     //newProps.data를 통해서 그 값을 확인할 수 있다.

  //     this.props.data
  //     //이것은 상위 컴포넌트의 props가 바뀌거나 새로운 것이
  //     //생기기 이전의 값을 확인할 수 있다.
  //   );

  //   if (this.props.data === newProps.data) {
  //     return false;
  //   }
  //   //만약 이때 concat이 아니라 push로 바꿔버리면 원본이 바뀌기 때문에
  //   //newProps.data와 this.props.data가 항상 같아져버린다.
  //   //그래서 이 함수는 항상 false를 반환하게 되어 아무리 값을 바꿔도
  //   //UI가 새로이 랜더링 되지 않는 문제가 발생한다.

  //   return true;
  // }
  render() {
    var lists = [];
    let data = this.props.data;
    var i = 0;

    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            //data-id={data[i].id} : 이것은 props를 이용한 방법이다.
            onClick={function (id, e) {
              //이렇게 이벤트를 통해서 상위 컴포넌트(App)의 state인
              //selected_id, mode 등을 바꿀 수 있다.

              //debugger;
              e.preventDefault();
              //this.props.onChangePage(e.target.dataset.id);
              //e.target.dataset.id를 통해서 App 컴포넌트의 contents state의 id에 접근할 수 있다.

              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
            //익명함수의 이벤트 객체는 항상 제일 마지막 파라미터가 되므로
            //bind함수의 this를 제외한 다른 파라미터들을 익명함수 파라미터에서
            //bind에 넣은 순서대로 작성하면 된다.
          >
            {data[i].title}
          </a>
        </li>
      );
      //위에서 key라는 것은 react가 내부적으로 여러 개의 요소들을 구분하기 위해서 필요한 것이다.
      i = i + 1;
    }
    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default TOC;
