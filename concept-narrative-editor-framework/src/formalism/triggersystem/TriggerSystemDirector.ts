import TriggerSystemNode from './TriggerSystemNode';
import NodeDirector from '../base/NodeDirector';
import ContentNode from './syntax/ContentNode';
import AndGate from './syntax/AndGate';

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

    private contentNode(): TriggerSystemNode {
        return this._builder
            .build(ContentNode)
            .label('Content Node')
            .addInPort('unlock')
            .addInPort('availableCondition')
            .addOutPort('unlocked')
            .addOutPort('available')
            .addOutPort('completed')
            .getNode();
    }

    private logicalExpression(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('Logical Expression')
            .addOutPort('out')
            .getNode();
    }

    private andGate(): TriggerSystemNode {
        return this._builder
            .build(AndGate)
            .label('AND')
            .addInPort('x')
            .addInPort('y')
            .addOutPort('out')
            .getNode();
    }

    private orGate(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('OR')
            .addInPort('x')
            .addInPort('y')
            .addOutPort('out')
            .getNode();
    }

    private notGate(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('NOT')
            .addInPort('x')
            .addOutPort('out')
            .getNode();
    }

    private true(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('True')
            .addOutPort('out')
            .getNode();
    }

    private false(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('False')
            .addOutPort('out')
            .getNode();
    }

    private delay(): TriggerSystemNode {
        return this._builder
            .build(TriggerSystemNode)
            .label('Delay')
            .addInPort('in')
            .addOutPort('out')
            .getNode();
    }
}

export default TriggerSystemDirector;