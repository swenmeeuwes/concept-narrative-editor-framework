import * as React from 'react';

import isElectron from 'is-electron';
import NodeEditor from './NodeEditor';

import './App.css';
import './superhero.min.css';

class App extends React.Component {
  render() {
    if (!isElectron()) {
      return (
        <div id="notSupported">
          <h1>This app has no browser support.</h1>
        </div>
      );
    }

    return (
      <NodeEditor />
    );
  }
}

export default App;
