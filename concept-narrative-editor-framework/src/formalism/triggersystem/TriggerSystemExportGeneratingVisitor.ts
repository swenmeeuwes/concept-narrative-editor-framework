import * as _ from 'lodash';
import * as joint from 'jointjs';

import ExportGeneratingVisitor from '../base/ExportGeneratingVisitor';
import Node from '../base/Node';
import ContentNode from './syntax/ContentNode';
import { TriggerSystemExport, StoryNode } from '../base/StoryExport';
import { UnlockPort, LogicalOutPort, AvailableConditionPort } from './TriggerSystemPorts';
import BoolNode from './syntax/BoolNode';
import CustomPort from '../base/CustomPort';
import DelayNode from './syntax/DelayNode';
import LogicalExpressionNode from './syntax/LogicalExpressionNode';
import RootNode from './syntax/RootNode';

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

    // Typescript y u no support method overloading ლ(ಠ益ಠლ)
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
                unlockCondition: null
            });

            // Handle out ports
            const outgoingUnlockedLinks = this._graph.getConnectedLinks(node, { outbound: true });
            outgoingUnlockedLinks.forEach(link => {
                const target = link.get('target');
                if (!target)
                    return;

                const source = link.get('source');
                const sourcePort = node.getPort(source.port) as CustomPort;
                const targetCell = this._graph.getCell(target.id) as Node;
                const targetPort = targetCell.getPort(target.port) as CustomPort;

                // Visit targetCell so we can values later
                this.visit(targetCell);

                const exportNode = this.findNodeInExport(target.id);
                if (!exportNode)
                    return;

                switch (targetPort.type) {
                    case UnlockPort.type:
                        exportNode.unlockCondition = `${node.id}_${sourcePort.type}`;
                        break;
                    case AvailableConditionPort.type:
                        exportNode.availableCondition = `${node.id}_${sourcePort.type}`;
                        break;
                    default:
                        console.warn(`[TriggerSystemExportGeneratingVisitor] Could not compile ${targetPort.type}`);
                        break;
                }
            });

            return;
        }

        if (node instanceof BoolNode) {
            const logicalOut = _.find(node.getPorts(), (port: CustomPort) => port.type === LogicalOutPort.type);
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

        if (node instanceof DelayNode) {
            // todo
            return;
        }

        if (node instanceof LogicalExpressionNode) {
            // todo
            return;
        }

        if (node instanceof RootNode) {
            // Ignore            
            return;
        }

        console.warn(`[TriggerSystemExportGeneratingVisitor] Could not handle node: ${node.constructor}`);
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