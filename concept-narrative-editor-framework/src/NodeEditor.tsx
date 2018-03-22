import * as React from 'react';
import * as joint from 'jointjs';
import ContentTypeModel from './model/ContentTypeModel';
import NodeEditorCanvas from './model/NodeEditorCanvas';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/jointjs/dist/joint.min.css';
import './NodeEditor.css';
import ContentInspector from './ContentInspector';

interface Props { }
interface State {
  selectedNode: joint.dia.CellView | null;
}

class NodeEditor extends React.Component<Props, State> {
  private _graph: joint.dia.Graph;
  private _canvas: NodeEditorCanvas;

  constructor(props: Props) {
    super(props);

    this.state = {
      selectedNode: null
    };

    this._graph = new joint.dia.Graph();
  }

  getCanvas(): NodeEditorCanvas {
    return this._canvas;
  }

  componentDidMount() {
    const parentContainer = document.getElementById('nodeEditor') as HTMLElement;
    const container = document.getElementById('nodeEditorCanvas') as HTMLElement;
    this._canvas = new NodeEditorCanvas({
      parentContainer: parentContainer,
      container: container,
      model: this._graph,
      onNodeSelected: this.onNodeSelected.bind(this)
    });

    for (var i = 0; i < 3; i++) {
      const model = new ContentTypeModel({
        position: { x: 100 + 150 * i, y: 50 + 100 * i },
        size: { width: 100, height: 100 }
      }, '#/definitions/contentTypes/textContent');

      this._graph.addCell(model);
    }
  }

  onNodeSelected(cellView: joint.dia.CellView) {
    this.setState({
      selectedNode: cellView
    });
  }

  render() {
    const contentInspector = <ContentInspector selectedNode={this.state.selectedNode} />;

    return (
      <div>
        <div id="inspector">
          {contentInspector}
        </div>
        <div id="nodeEditor">
          <div id="nodeEditorCanvas" />
        </div>
      </div>
    );
  }
}

export default NodeEditor;
