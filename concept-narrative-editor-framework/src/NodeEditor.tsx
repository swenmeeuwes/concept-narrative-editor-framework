import * as React from 'react';
import * as joint from 'jointjs';
import ContentTypeModel from './model/ContentTypeModel';
import NodeEditorCanvas from './model/NodeEditorCanvas';

import '../node_modules/react-grid-layout/css/styles.css';
import '../node_modules/jointjs/dist/joint.min.css';
import './NodeEditor.css';

class NodeEditor extends React.Component {
  private _graph: joint.dia.Graph;
  private _canvas: NodeEditorCanvas;

  constructor(props: React.ReactPropTypes) {
    super(props);

    this._graph = new joint.dia.Graph();
  }

  getCanvas(): NodeEditorCanvas {
    return this._canvas;
  }

  componentDidMount() {
    const parentContainer = document.getElementById('nodeEditor') as HTMLElement;
    const container = document.getElementById('nodeEditorCanvas') as HTMLElement;
    this._canvas = new NodeEditorCanvas({
      parentContainter: parentContainer,
      container: container,
      model: this._graph
    });

    for (var i = 0; i < 3; i++) {
      this._graph.addCell(new ContentTypeModel({
        position: { x: 100 + 150 * i, y: 50 + 100 * i },
        size: { width: 100, height: 100 }
      }));
    }
  }

  render() {
    return (
      <div>
        <div id="inspector">
          placeholder
          <div/>
        </div>
        <div id="nodeEditor">
          <div id="nodeEditorCanvas" />
        </div>
      </div>
    );
  }
}

export default NodeEditor;
