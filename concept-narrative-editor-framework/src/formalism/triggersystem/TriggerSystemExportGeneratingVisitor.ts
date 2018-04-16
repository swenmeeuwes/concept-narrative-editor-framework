import * as _ from 'lodash';
import * as joint from 'jointjs';

import ExportGeneratingVisitor from '../base/ExportGeneratingVisitor';
import Node from '../base/Node';
import ContentNode from './syntax/ContentNode';
import { TriggerSystemExport, StoryNode } from '../base/StoryExport';
import { UnlockPort, LogicalOutPort } from './TriggerSystemPorts';
import BoolNode from './syntax/BoolNode';

class TriggerSystemExportGeneratingVisitor implements ExportGeneratingVisitor<TriggerSystemExport> {
    private _graph: joint.dia.Graph;

    private _generatedExport: TriggerSystemExport;
    private _currentStoryArc: number = 0;

    constructor(graph: joint.dia.Graph) {
        this._graph = graph;

        this._generatedExport = {
            storyArcs: [{
                availableCondition: null,
                label: 'notimplemented',
                data: null,
                id: 'notimplemented',
                storyNodes: [],
                isRetained: false,
                metadata: null,
                isEnd: false,
                unlockCondition: null
            }],
            data: null
        };
    }

    // Typescript y u no support method overloading
    public visit(node: Node) {
        if (node instanceof ContentNode) {
            if (this.nodeExistsInExport(node.id.toString()))
                return;

            this.storyNodes.push({
                availableCondition: null,
                label: node.contentModel.data.label,
                data: node.contentModel.data,
                id: node.id.toString(),
                isRetained: node.contentModel.data.retained,
                metadata: null,
                isEnd: false,
                unlockCondition: _.find(node.getPorts(), port => port.label === UnlockPort.label)
            });
            return;
        }

        if (node instanceof BoolNode) {
            // Checking on equal labels might not be a good idea
            // Different ports could share the same labels
            const logicalOut = _.find(node.getPorts(), port => port.label === LogicalOutPort.label);
            if (!logicalOut)
                return;

            const outgoingLinks = this._graph.getConnectedLinks(node, { outbound: true });
            outgoingLinks.forEach(link => {
                const target = link.get('target');
                const targetNode = this._graph.getCell(target.id) as Node;
                targetNode.accept(this); // Visit the target node if it wasn't yet visited

                const targetNodeInExport = this.findNodeInExport(target.id);
                if (targetNodeInExport)
                    targetNodeInExport.availableCondition = node.value.value ? 'true' : 'false';
            });

            return;
        }

        console.warn(`[TriggerSystemExportGeneratingVisitor] Could not handle node: ${node}`);
    }

    public getResult() {
        return this._generatedExport;
    }

    public getJSON() {
        return JSON.stringify(this.getResult());
    }

    private get storyNodes(): StoryNode[] {
        return this._generatedExport.storyArcs[this._currentStoryArc].storyNodes;
    }

    private nodeExistsInExport(nodeId: string): boolean {
        return _.some(this.storyNodes, storyNode => storyNode.id === nodeId);
    }

    private findNodeInExport(nodeId: string): StoryNode | undefined {
        return _.find(this.storyNodes, storyNode => storyNode.id === nodeId);
    }
}

export default TriggerSystemExportGeneratingVisitor;