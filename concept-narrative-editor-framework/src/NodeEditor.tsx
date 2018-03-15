import * as React from 'react';
import * as joint from 'jointjs';
import ContentTypeModel from './model/ContentTypeModel';
import NodeEditorCanvas from './model/NodeEditorCanvas';

import '../node_modules/jointjs/dist/joint.min.css';

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
    const container = document.querySelector('#nodeEditorCanvas') as HTMLElement;
    this._canvas = new NodeEditorCanvas({
      container: container,
      model: this._graph
    });

    // test
    // var rect = new joint.shapes.basic.Rect({
    //   position: { x: 50, y: 50 },
    //   size: { width: 100, height: 100 }
    // });

    for (var i = 0; i < 2; i++) {
      this._graph.addCell(new ContentTypeModel({
        position: { x: 100 + 150 * i, y: 50 + 100 * i },
        size: { width: 100, height: 100 }
      }));
    }
  }

  render() {
    return (
        <div id="nodeEditorCanvas" />
    );
  }
}

export default NodeEditor;
