import * as React from 'react';

import Database from '../../common/Database';
import './index.scss'

interface DatabasesProps {
  databases: Database[]
}

interface DatabasesState {
  selectDatabase: string
}

export default class Databases extends React.Component<DatabasesProps, DatabasesState> {
  constructor(props: DatabasesProps) {
    super(props);

    this.state = {
      selectDatabase: 'mysql'
    }
  }

  selectDatabase = (databaseName: string) => {
    fetch('/db/exec', {
      body: JSON.stringify({
        sql: `use ${databaseName};`
      }),
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    }).then(response => {
      this.setState({selectDatabase: databaseName})
    })
  }

  handlerSelectDatabase = (databaseName: string) => (event: any) => {
    this.selectDatabase(databaseName);
  }

  componentDidMount() {
    this.selectDatabase(this.state.selectDatabase);
  }

  render() {
    const {databases} = this.props;
    const {selectDatabase} = this.state;

    const databasesDom = databases.map((database: Database) =>
      <li
        className={database.Database === selectDatabase ? "enable": ''}
        key={database.Database}
        onClick={this.handlerSelectDatabase(database.Database)}
      >
        {database.Database}
        </li>
    );

    return (
      <ul className="database-list">{databasesDom}</ul>
    )
  }
}
