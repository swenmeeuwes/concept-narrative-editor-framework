import * as React from 'react';
import isElectron from 'is-electron';

import NodeEditor from './NodeEditor';
import AssetLoader from './assetloading/AssetLoader';

import './App.css';
import '../node_modules/bootswatch/dist/superhero/bootstrap.min.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';

interface State {
  loading: boolean;
}

class App extends React.Component<{}, State> {
  constructor(props: React.ReactPropTypes) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentWillMount() {
    AssetLoader.Instance.LoadContentSchema()
      .then((contentSchema) => {
        this.setState({
          loading: false
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    if (!isElectron()) {
      return (
        <div id="notSupported">
          <h1>This app has no browser support.</h1>
        </div>
      );
    }

    if (this.state.loading)
      return (<i className="fas fa-spinner" />);

    return (
      <NodeEditor />
    );
  }
}

export default App;
