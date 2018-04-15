import * as React from 'react';
import * as joint from 'jointjs';
import NodeEditorCanvas from './model/NodeEditorCanvas';
import ContentInspector from './inspector/ContentInspector';

import '../node_modules/jointjs/dist/joint.min.css';
import './NodeEditor.css';
import ApplicationMenu from './menu/ApplicationMenu';
import ContentTypeFactory from './schema/ContentTypeFactory';
import ContentTypeNode from './model/ContentTypeNode';
import TriggerSystemNodeBuilder from './formalism/triggersystem/TriggerSystemNodeBuilder';
import TriggerSystemDirector from './formalism/triggersystem/TriggerSystemDirector';
// import StateMachineNodeBuilder from './formalism/statemachine/StateMachineNodeBuilder';
// import StateMachineDirector from './formalism/statemachine/StateMachineDirector';

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
    ApplicationMenu.Instance.handleDelete = this.handleDelete;

    setTimeout(() => {
      // Test 
      const nodeBuilder = new TriggerSystemNodeBuilder();
      const director = new TriggerSystemDirector(nodeBuilder);
      // const nodeBuilder = new StateMachineNodeBuilder();
      // const director = new StateMachineDirector(nodeBuilder);
      const availableNodes = director.construct();

      for (let j = 0; j < availableNodes.length; j++) {
        const node = availableNodes[j];
        node.position(16 + 116 * (j % 4), 16 + 116 * Math.floor(j / 4));

        this._graph.addCell(node);
      }
    }, 100);
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
  }

  onNodeSelected(cellView: joint.dia.CellView) {
    // Unhighlight previous node
    if (this.state.selectedNode !== null)
      this.state.selectedNode.unhighlight();

    if (!cellView)
      return;

    cellView.highlight();

    this.setState({
      selectedNode: cellView
    });

    // TEST
    const selectedCell = cellView.model;
    if (selectedCell !== undefined) {
      const startElement = selectedCell.isElement() ? selectedCell as joint.dia.Element : undefined;

      if (startElement !== undefined)
        this._graph.bfs(startElement,
          (visitedElement, distance) => {
            console.log(visitedElement, distance, visitedElement.getPorts()); return true;
          },
          { outbound: true });
    }
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

  private handleInsert = () => {
    const model = ContentTypeFactory.Instance.createContent();
    this._graph.addCell(new ContentTypeNode(model));
  }

  private handleDelete = () => {
    const selectedNode = this.state.selectedNode;
    if (!selectedNode || !selectedNode.model)
      return;

    selectedNode.model.remove();

    this.setState({
      selectedNode: null
    });
  }
}

export default NodeEditor;
