import * as React from 'react';

import ContentTypeFactory from './ContentTypeFactory';
import NodeEditor from './NodeEditor';

import 'react-bootstrap';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  render() {
    // const contentTypeFactory = new ContentTypeFactory();
    ContentTypeFactory.Instance().initialize();

    return (
      <NodeEditor />
    );
  }
}

export default App;
