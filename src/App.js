import React, { Component } from 'react';
import './App.css';
import Table from './components/Table'

const tasks = [
  { id: 1, name: 'Go shopping', date: '2020-09-01' },
  { id: 2, name: 'Finish work', date: '2020-09-02' },
  { id: 3, name: 'Prepare food', date: '2020-09-03' },
  { id: 4, name: 'Happy birthday to dad', date: '2020-10-01' },
  { id: 5, name: 'Happy birthday to brother', date: '2020-10-30' },
  { id: 6, name: 'Have an interview', date: '2020-09-24' },
];

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="tableHeader">
          Task list
        </h1>
        <Table data={tasks} />
      </div>
    );
  }
}

export default App;
