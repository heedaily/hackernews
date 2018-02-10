import React, { Component } from 'react';
import './App.css';

// ログが出力される。
console.log(`App.js file load before`);

class Developer {
  constructor(firstname, lastname) {
    this.firstname = firstname;
    this.lastname = lastname;
  }

  getName() {
    return this.firstname + ' ' + this.lastname;
  }

}

class App extends Component {
  render() {
    console.log(`render function load`);
    
    const hwText = 'リアクトへようこそ';
    // constタイプだから変更ができない。
    // hwText = 'おはよう、リアクト';
    
    // constタイプだとしても配列、オブジェクトの場合には変更が可能。
    const helloWorld = {
      text: 'リアクトへようこそ'
    };
    helloWorld.text = 'おはよう、リアクト';
    
    // 内部関数として、ユーザ情報を扱う。
    function formatName(user) {
      return user.firstName + ' ' + user.lastName;
    }
    const user = {
      firstName: 'Harper',
      lastName: 'Perez'
    };
    const element = (
      <h3>
      Hello, {formatName(user)}!
      </h3>
    );
    
    // クラスとして、ユーザ情報を扱う。
    const dev = new Developer(user.firstName, user.lastName);
    
    const list = [
      {
        title: 'React',
        url: 'https://facebook.github.io/react/',
        author: 'Jordan Walke',
        num_comments: 3,
        points: 4,
        objectID: 0,
      },
      {
        title: 'Redux',
        url: 'https://github.com/reactjs/redux',
        author: 'Dan Abramov, Andrew Clark',
        num_comments: 2,
        points: 5,
        objectID: 1,
      },
    ];
    
    // rootタグは一つのみにする。
    // JSXで返すのはすべて文字扱いになる。
    // {}内部がコードとして一行される。
    // 返すオブジェクトでログを出力するためにはどうすればいいのかな。
    // keyは配列のインデックスにするのはNG。配列の順序が変わるとリアクトで各項目の識別ができなくなってしまう。
    // =>にするとthisが自身ではなく本文コンテキストになるので注意が必要。
    // ES6で=>は{}の省略が可能。かつ省略された場合にはretrunが含まれている。
    return (
      <div className="App">
        <div>
          <h2>リアクト</h2>
        </div>
        <h3>{hwText}</h3>
        <h3>{helloWorld.text}</h3>
        {element}
        {list.map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>
            <span>{item.author}</span>
            <span>{item.num_comments}</span>
            <span>{item.points}</span>
          </div>
        )}
        <h3>{dev.getName()}</h3>
      </div>
    );
  }
}

console.log(`App.js file load after`);
export default App;

