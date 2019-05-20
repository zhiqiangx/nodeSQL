import * as React from 'react';

import Database from '../../common/Database';
import './App.scss';

import Databases from '../../components/Databases'

interface AppState {
  databases: Database[],
  sql: string,
  result: any[]
}

class App extends React.Component<any, AppState> {
  constructor(props: any) {
    super(props);

    this.state = {
      databases: [],
      sql: '',
      result: []
    };
  }

  execSql = (e: any) => {
    window.console.log(this.state.sql)
    fetch('/db/exec', {
      body: JSON.stringify({
        sql: this.state.sql
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json())
      .then((res) => {
        window.console.log(res)
        this.setState({
          result: res
        })
      })
  }

  getDatabases = (): void => {
    fetch('/db/exec', {
      body: JSON.stringify({
        sql: 'show databases;'
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => response.json())
      .then((res: Database[]) => {
        this.setState({databases: res});
      })
  }

  handleTextAreaChange = (e: any) => {
    this.setState({
      sql: e.target.value
    })
  }

  componentDidMount() {
    this.getDatabases();
  }

  render() {
    const { databases, result } = this.state;

    return (
      <main>
        <Databases databases={databases} />
        <div className="flex">
          <textarea
            className="flex-item"
            value={this.state.sql}
            onChange={this.handleTextAreaChange}
          />
          <button onClick={this.execSql}>exec</button>
        </div>
        <table>
          <thead>
            <tr>
              {
                result.length > 0 && Object.keys(result[0]).map((key: string) => <th key={key}>{key}</th>)
              }
            </tr>
          </thead>
          <tbody>
          {
            result.map((item, index) =>
              <tr key={index}>
                {
                  Object.keys(item).map(res => <td key={item[res]}>{item[res]}</td>)
                }
              </tr>
            )
          }
          </tbody>
        </table>
      </main>
    );
  }
}

export default App;
