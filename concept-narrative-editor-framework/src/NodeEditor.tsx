import * as React from 'react';
import * as joint from 'jointjs';

import NodeEditorCanvas from './NodeEditorCanvas';
import ContentInspector from './inspector/ContentInspector';
import ApplicationMenu from './menu/ApplicationMenu';
import TriggerSystemNodeBuilder from './formalism/triggersystem/TriggerSystemNodeBuilder';
import TriggerSystemDirector from './formalism/triggersystem/TriggerSystemDirector';
import TriggerSystemExportGeneratingVisitor from './formalism/triggersystem/TriggerSystemExportGeneratingVisitor';
import Node from './formalism/base/Node';
import FileManager from './io/FileManager';
import RootNode from './formalism/triggersystem/syntax/RootNode';

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
    ApplicationMenu.instance.handleInsert = this.handleInsert.bind(this);
    ApplicationMenu.instance.handleDelete = this.handleDelete.bind(this);
    ApplicationMenu.instance.handleExport = this.handleExport.bind(this);

    this.initializeSyntax();
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

  private initializeSyntax() {
    const nodeBuilder = new TriggerSystemNodeBuilder();
    const director = new TriggerSystemDirector(nodeBuilder);
    const availableNodes = director.construct();
    this.injectApplicationMenuNodeItems(availableNodes);
  }

  private injectApplicationMenuNodeItems(availableNodes: Node[]) {
    availableNodes.forEach(availableNode => {
      const menuItemOptions = {
        label: availableNode.attr('.label').text,
        click: () => {
          this._graph.addCell(availableNode.clone());
          console.log(availableNode, availableNode.getPorts(), availableNode.clone());
        }
      };

      ApplicationMenu.instance.addMenuItemToInsert(menuItemOptions);
    });
  }

  private handleInsert = () => {
    // this._graph.addCell(new TriggerSystemDirector(new TriggerSystemNodeBuilder()).construct()[0]);
    console.warn('obsolete, insert using concrete items');
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

  private handleExport() {
    // TEST
    const exportGeneratingVisitor = new TriggerSystemExportGeneratingVisitor(this._graph);
    const elements = this._graph.getElements();
    const startElement = elements.find(element => element instanceof RootNode);

    if (startElement !== undefined) {
      this._graph.bfs(startElement,
        (visitedElement, distance) => {
          if (visitedElement instanceof Node)
            visitedElement.accept(exportGeneratingVisitor);
          return true;
        },
        { outbound: true, inbound: true });

      console.log(exportGeneratingVisitor.getResult().storyArcs[0].storyNodes);

      FileManager.Instance.saveAs(exportGeneratingVisitor.getJSON(), [
        { name: 'Story Files', extensions: ['sty'] }
      ]);
    }
  }
}

export default NodeEditor;
