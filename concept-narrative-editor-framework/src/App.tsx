import * as React from 'react';
import './App.css';

import ContentTypeFactory from './ContentTypeFactory';

import NodeEditor from './NodeEditor';

class App extends React.Component {
  render() {
    const contentTypeFactory = new ContentTypeFactory();
    contentTypeFactory.readDir();

    return (
      <NodeEditor />
    );
  }
}

export default App;
