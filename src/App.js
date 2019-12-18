import React, { Component } from "react";
// import logo from './logo.svg';
import "./App.css";
import { CardList } from "./components/card-list/card-list.component";
import { SearchBox } from "./components/search/search-box.component";

class App extends Component {
  constructor() {
    super();

    this.state = {
      monsters: [],
      searchField: ""
    };
  }
  //React life cycle components
  async componentDidMount() {
    let response = await fetch("https://jsonplaceholder.typicode.com/users", {
      method: "GET"
    });

    let users = await response.json();
    if (users) {
      this.setState({ monsters: users });
    } else {
      console.log("no users..");
    }
  }

  searching = event => {
    this.setState({ searchField: event.target.value }, () => {
      console.log(this.state.searchField);
      console.log(this);
    });
  };

  render() {
    const { monsters, searchField } = this.state;
    const filteredMonster = monsters.filter(monster =>
      monster.name.toLowerCase().includes(searchField)
    );
    return (
      <div className="App">
        <h1>MOnster-RolOdex</h1>
        <SearchBox
          searchHandler={e => this.searching(e)}
          placeholder="search monster"
        ></SearchBox>
        <CardList monsters={filteredMonster}></CardList>
      </div>
    );
  }
}

export default App;
