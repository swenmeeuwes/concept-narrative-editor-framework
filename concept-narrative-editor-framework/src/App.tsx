import * as React from 'react';
import './App.css';

import NodeEditor from './NodeEditor';

class App extends React.Component {
  render() {
    return (
      <div id="app">
        <NodeEditor />
      </div>
    );
  }
}

export default App;
