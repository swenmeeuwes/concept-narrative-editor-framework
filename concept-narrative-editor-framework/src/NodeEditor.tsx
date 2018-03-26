import * as React from 'react';
import * as joint from 'jointjs';
import ContentTypeNode from './model/ContentTypeNode';
import NodeEditorCanvas from './model/NodeEditorCanvas';
import ContentInspector from './inspector/ContentInspector';

import '../node_modules/jointjs/dist/joint.min.css';
import './NodeEditor.css';
import ApplicationMenu from './menu/ApplicationMenu';
import AssetLoader from './assetloading/AssetLoader';
import SchemaHelper from './util/SchemaHelper';

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

    // hack ;c
    ApplicationMenu.Instance.handleInsert = this.handleInsert;
  }

  public handleInsert = () => {
    const firstContentType = AssetLoader.Instance.Library.contentSchemaWrapper.AvailableContentTypes[0];

    const model = new ContentTypeNode({
      position: { x: 50, y: 50 },
      size: { width: 96, height: 96 }
    }, SchemaHelper.padContentTypeDefinition(firstContentType));
    this._graph.addCell(model);
  }

  public get Canvas(): NodeEditorCanvas {
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

    // Just for testing
    for (var i = 0; i < 3; i++) {
      let id = '#/definitions/contentTypes/textContent';
      if (i === 1)
        id = '#/definitions/contentTypes/variableMutationContent';
      if (i === 2)
        id = '#/definitions/contentTypes/imageContent';

      const model = new ContentTypeNode({
        position: { x: 100 + 150 * i, y: 50 + 100 * i },
        size: { width: 96, height: 96 }
      }, id);

      this._graph.addCell(model);
    }
  }

  onNodeSelected(cellView: joint.dia.CellView) {
    // Unhighlight previous node
    if (this.state.selectedNode !== null)
      this.state.selectedNode.unhighlight();

    if (cellView !== null)
      cellView.highlight();

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
