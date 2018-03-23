import * as React from 'react';

import isElectron from 'is-electron';
import NodeEditor from './NodeEditor';

import './App.css';
import '../node_modules/bootswatch/dist/superhero/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

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
