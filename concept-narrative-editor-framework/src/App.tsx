import * as React from 'react';
import isElectron from 'is-electron';

import NodeEditor from './NodeEditor';
import AssetLoader from './io/AssetLoader';

import './App.css';
import '../node_modules/font-awesome/css/font-awesome.min.css';
import '../node_modules/bootswatch/dist/superhero/bootstrap.min.css';

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
        setTimeout(() => {
          this.setState({
            loading: false
          });
        }, 100);
      })
      .catch((err) => {
        alert(`Unable to load json schema. Error: ${err.error.message}`);
        throw err;
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

    const spinnerStyle = {
      fontSize: '48px'
    };

    if (this.state.loading)
      return (<i className="fa fa-spinner fa-spin centered" style={spinnerStyle} />);

    return (
      <NodeEditor />
    );
  }
}

export default App;
