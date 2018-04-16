import TriggerSystemNode from './TriggerSystemNode';
import NodeDirector from '../base/NodeDirector';
import ContentNode from './syntax/ContentNode';
import BoolNode from './syntax/BoolNode';
import LogicalExpressionNode from './syntax/LogicalExpressionNode';
import { BoolValue } from '../base/syntax/Values';
import { Not, Or, And } from '../base/syntax/LogicalExpressions';
import {
    AvailableConditionPort, UnlockedPort, UnlockPort,
    AvailablePort, CompletedPort, LogicalOutPort,
    LogicalInPort, DelayInPort, DelayOutPort
} from './TriggerSystemPorts';

class TriggerSystemDirector extends NodeDirector<TriggerSystemNode> {
    public construct(): TriggerSystemNode[] {
        return [
            this.contentNode(),
            this.andGate(),
            this.orGate(),
            this.notGate(),
            this.true(),
            this.false(),
            this.delay(),
            this.logicalExpression()
        ];
    }

    private contentNode(): ContentNode {
        return this._builder
            .build(ContentNode)
            .label('Content Node')
            .addPort(UnlockPort)
            .addPort(AvailableConditionPort)
            .addPort(UnlockedPort)
            .addPort(AvailablePort)
            .addPort(CompletedPort)
            .getNode<ContentNode>();
    }

    private logicalExpression(): LogicalExpressionNode {
        const node = this._builder
            .build(LogicalExpressionNode)
            .label('Logical Expression')
            .addPort(LogicalOutPort)
            .getNode<LogicalExpressionNode>();

        return node;
    }

    private andGate(): LogicalExpressionNode {
        const node = this._builder
            .build(LogicalExpressionNode)
            .label('AND')
            .addPort(LogicalInPort)
            .addPort(LogicalInPort)
            .addPort(LogicalOutPort)
            .getNode<LogicalExpressionNode>();

        node.expression = new And(new BoolValue(false), new BoolValue(false)); // todo: work this out, do we really need a default value?

        return node;
    }

    private orGate(): LogicalExpressionNode {
        const node = this._builder
            .build(LogicalExpressionNode)
            .label('OR')
            .addPort(LogicalInPort)
            .addPort(LogicalInPort)
            .addPort(LogicalOutPort)
            .getNode<LogicalExpressionNode>();

        node.expression = new Or(new BoolValue(false), new BoolValue(false)); // todo: work this out, do we really need a default value?

        return node;
    }

    private notGate(): LogicalExpressionNode {
        const node = this._builder
            .build(LogicalExpressionNode)
            .label('NOT')
            .addPort(LogicalInPort)
            .addPort(LogicalOutPort)
            .getNode<LogicalExpressionNode>();

        node.expression = new Not(new BoolValue(false)); // todo: work this out, do we really need a default value?

        return node;
    }

    private true(): BoolNode {
        const node = this._builder
            .build(BoolNode)
            .label('True')
            .addPort(LogicalOutPort)
            .getNode<BoolNode>();

        node.value = new BoolValue(true);

        return node;
    }

    private false(): BoolNode {
        const node = this._builder
            .build(BoolNode)
            .label('False')
            .addPort(LogicalOutPort)
            .getNode<BoolNode>();

        node.value = new BoolValue(false);

        return node;
    }

    private delay(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('Delay')
            .addPort(DelayInPort)
            .addPort(DelayOutPort)
            .getNode();
    }
}

export default TriggerSystemDirector;