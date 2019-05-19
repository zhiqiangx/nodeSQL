import * as React from 'react';
import './index.scss'

interface DatabasesProps {
  databases: number[]
}

export default class Databases extends React.Component<DatabasesProps, {}> {
  constructor(props: DatabasesProps) {
    super(props);
  }

  render() {
    const {databases} = this.props;

    const databasesDom = databases.map((database: number) => <li key={database}>{database}</li>);

    return (
      <ul className="database-list">{databasesDom}</ul>
    )
  }
}
