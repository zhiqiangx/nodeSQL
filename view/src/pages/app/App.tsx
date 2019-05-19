import * as React from 'react';
import './App.scss';

import Databases from '../../components/Databases'

class App extends React.Component {
  render() {
    const databases = [1, 2, 3];
    return (
      <main>
        <Databases databases={databases} />
        <div>hello, wor ld</div>
      </main>
    );
  }
}

export default App;
