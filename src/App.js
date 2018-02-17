import React, { Component } from 'react';
import './App.css';

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

const name = 'Robin';
const key = 'name';
const user = {
  [key]: name,
};

const userService = {
  getUserName(user) {
    return user[key];
  },
};

const isSearched = (searchTerm) => (item) =>
  item.title.toLowerCase().includes(searchTerm.toLowerCase());
  
const userDestructuring = {
  firstname: 'Robin',
  lastname: 'Wieruch',
};
const {
  firstname,
  lastname
} = userDestructuring;

console.log(firstname + ' ' + lastname);

const usersDestructuring = ['Robin', 'Andrew', 'Dan'];
const [
  userOne,
  userTwo,
  userThree
] = usersDestructuring;

console.log(userOne, userTwo, userThree);
 
 // 非状態関数形コンポネント
 // stateが無いので、this.stateまたは、this.setState()でstateへアクセスやアップデートできません。
 // constructor()が有り、render()が使用できます。
 // render()はコンポネントがアップデートされる度に実行されます。
class App extends Component {
  constructor(props) {
    console.log(`constructor props: ${JSON.stringify(props)}`);
    super(props);
    
    this.state = {
      list,
      searchTerm: '',
    };
    
    // インスタンスで自動にthisをバインドしないため、バインドする。
    this.onDismiss = this.onDismiss.bind(this);
    this.onSearchChange = this.onSearchChange.bind(this);
  }
  
  onDismiss(id) {
    const updatedList = this.state.list.filter(item => item.objectID !== id);
    this.setState({ list: updatedList });
  }
  
  onSearchChange(event) {
    console.log(`onSearchChange event.target.value: ${event.target.value}`);
    this.setState({ searchTerm: event.target.value });
  }
  onClickMe= () => console.log(this);
 
  render() {
    const { searchTerm, list } = this.state;
    return (
      <div className="page">
        <div className="interactions">
          <div>
            <h2>リアクト</h2>
          </div>
          <div>
            <h2>{userService.getUserName(user)}</h2>
          </div>
          <div>------------------------------ClickEvent--------------------------------------</div>
          {this.state.list.map(item => {
            const onHandleDismiss = () => this.onDismiss(item.objectID);
            return (
              <div key={item.objectID} className="App-item">
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>&nbsp;
                <span>{item.author}</span>&nbsp;
                <span>{item.num_comments}</span>&nbsp;
                <span>{item.points}</span>&nbsp;
                <span>
                  <button
                    onClick={onHandleDismiss}
                    type="button"
                  >
                    dismiss
                  </button>&nbsp;
                  <button
                    onClick={this.onClickMe}
                      type="button"
                  >
                    Click Me
                  </button>&nbsp;
                  <button
                  onClick = {() => console.log(item.objectID)}
                  type="button"
                  >
                  Dismiss
                  </button>
                </span>
              </div>
            );
          }
          )}
          <div>------------------------------Filter--------------------------------------</div>
          <form>
            TitleSearch : <input 
              type="text" 
              value={searchTerm} 
              onChange={this.onSearchChange} 
              />
          </form>
          {list.filter(isSearched(searchTerm)).map(item => {
          // {this.state.list.filter(isSearched(this.state.searchTerm)).map(item => {
            const onHandleDismiss = () => this.onDismiss(item.objectID);
            return (
              <div key={item.objectID} className="App-item">
                <span>
                  <a href={item.url}>{item.title}</a>
                </span>&nbsp;
                <span>{item.author}</span>&nbsp;
                <span>{item.num_comments}</span>&nbsp;
                <span>{item.points}</span>&nbsp;
                <span>
                  <button
                    onClick={onHandleDismiss}
                    type="button"
                  >
                    dismiss
                  </button>&nbsp;
                  <button
                    onClick={this.onClickMe}
                      type="button"
                  >
                    Click Me
                  </button>&nbsp;
                  <button
                  onClick = {() => console.log(item.objectID)}
                  type="button"
                  >
                  Dismiss
                  </button>
                </span>
              </div>
            );
          }
          )}
          <div>------------------------------Component--------------------------------------</div>
          <Search
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </Search>
          <Table
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
          <div>------------------------------FunctionalStatelessComponents--------------------------------------</div>
          <SearchFunctionalStatelessComponents
            value={searchTerm}
            onChange={this.onSearchChange}
          >
            Search
          </SearchFunctionalStatelessComponents>
          <TableFunctionalStatelessComponents
            list={list}
            pattern={searchTerm}
            onDismiss={this.onDismiss}
          />
          </div>
      </div>
    );
  }
}

class Search extends Component {
  render() {
    // propsはthisを使用して、クラスのインスタンスへアクセスする。
    // Appコンポネントのすべてが渡される。
    // childrenはオブジェクトの中にアクセスできるプロパティ。
    const { value, onChange, children } = this.props;
    return (
      <form>
        {children} : <input
          type="text"
          value={value}
          onChange={onChange}
        />
      </form>
    );
  }
}

class Table extends Component {
  render() {
    const { list, pattern, onDismiss } = this.props;
    return (
      <div>
        {list.filter(isSearched(pattern)).map(item =>
          <div key={item.objectID}>
            <span>
              <a href={item.url}>{item.title}</a>
            </span>&nbsp;
            <span>{item.author}</span>&nbsp;
            <span>{item.num_comments}</span>&nbsp;
            <span>{item.points}</span>&nbsp;
            <span>
              <Button onClick={() => onDismiss(item.objectID)}>
                Dismiss
              </Button>&nbsp;
            </span>&nbsp;
          </div>
        )}
      </div>
    );
  }
}

// 再利用できるコンポネント(Reusable Components)
// リアクトではすべてのコンポネントが再利用できるコンポネントで在る。
class Button extends Component {
  render() {
    const {
      onClick,
      className = '',
      children,
    } = this.props;

    return (
      <button
        onClick={onClick}
        className={className}
        type="button"
      >
        {children}
      </button>
    );
  }
}

// 非状態関数形コンポネントへ変更
const SearchFunctionalStatelessComponents = ({ value, onChange, children }) => {
// 2. function Search({ value, onChange, children }) {
  // 1. function Search(props) {
  // 1. const { value, onChange, children } = props;
  return (
    <form>
      {children} : <input
        type="text"
        value={value}
        onChange={onChange}
      />
    </form>
  );
}

const largeColumn = {
  width: '40%',
};

const midColumn = {
  width: '30%',
};

const smallColumn = {
  width: '10%',
};

const TableFunctionalStatelessComponents = ({ list, pattern, onDismiss }) =>
  <div className="table">
    {list.filter(isSearched(pattern)).map(item =>
      <div key={item.objectID} className="table-row">
        <span style={{ width: '40%' }}>
          <a href={item.url}>{item.title}</a>
        </span>
        <span style={{ width: '30%' }}>
          {item.author}
        </span>
        <span style={{ width: '10%' }}>
          {item.num_comments}
        </span>
        <span style={{ width: '10%' }}>
          {item.points}
        </span>
        <span style={{ width: '10%' }}>
          <Button
            onClick={() => onDismiss(item.objectID)}
            className="button-inline"
          >
            Dismiss
          </Button>
        </span>
      </div>
    )}
  </div>
export default App;

