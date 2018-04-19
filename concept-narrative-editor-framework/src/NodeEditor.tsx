import * as React from 'react';
import * as joint from 'jointjs';

import NodeEditorCanvas from './NodeEditorCanvas';
import ContentInspector from './inspector/ContentInspector';
import ApplicationMenu from './menu/ApplicationMenu';
import TriggerSystemNodeBuilder from './formalism/triggersystem/TriggerSystemNodeBuilder';
import TriggerSystemDirector from './formalism/triggersystem/TriggerSystemDirector';
import TriggerSystemExportGeneratingVisitor from './formalism/triggersystem/TriggerSystemExportGeneratingVisitor';
import Node from './formalism/base/Node';

import '../node_modules/jointjs/dist/joint.min.css';
import './NodeEditor.css';

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
    }, 0);
  }

  public get Canvas(): NodeEditorCanvas {
    return this._canvas;
  }

  public componentDidMount() {
    const parentContainer = document.getElementById('nodeEditor') as HTMLElement;
    const container = document.getElementById('nodeEditorCanvas') as HTMLElement;
    this._canvas = new NodeEditorCanvas({
      parentContainer: parentContainer,
      container: container,
      model: this._graph,
      onNodeSelected: this.onNodeSelected.bind(this)
    });

    this._graph.on('change:embeds', this.onEmbed);
  }

  public onNodeSelected(cellView: joint.dia.CellView) {
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
    const exportGeneratingVisitor = new TriggerSystemExportGeneratingVisitor(this._graph);
    const selectedCell = cellView.model;
    if (selectedCell !== undefined) {
      const startElement = selectedCell.isElement() ? selectedCell as joint.dia.Element : undefined;

      if (startElement !== undefined) {
        this._graph.bfs(startElement,
          (visitedElement, distance) => {
            if (visitedElement instanceof Node)
              visitedElement.accept(exportGeneratingVisitor);
            return true;
          },
          { outbound: true, inbound: true });

        console.log(exportGeneratingVisitor.getResult().storyArcs[0].storyNodes);
      }
    }
  }

  public render() {
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
    this._graph.addCell(new TriggerSystemDirector(new TriggerSystemNodeBuilder()).construct()[0]);
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

  private onEmbed(element: joint.dia.Element, newEmbeds: string[], opt: any) {
    const previousEmbeds = element.previous('embeds') as string[];
    const currentEmbeds = element.get('embeds') as string[];
    if (previousEmbeds && currentEmbeds && previousEmbeds.length > currentEmbeds.length)
      return; // Don't update when an embed is moved around
              // todo: fit if embed was removed

    element.fitEmbeds({
      padding: 64
    });

    const newSize = element.size();
    element.attr('rect', { width: newSize.width, height: newSize.height });
  }
}

export default NodeEditor;
