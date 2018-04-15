import StateMachineNode from './StateMachineNode';
import NodeDirector from '../base/NodeDirector';

class StateMachineDirector extends NodeDirector<StateMachineNode> {
    public construct(): StateMachineNode[] {
        return [
            this.node()
        ];
    }

    private node(): StateMachineNode {
        return this._builder
            .build(StateMachineNode)
            .allowBodyConnections()
            .addOutPort('out')
            .getNode();
    }
}

export default StateMachineDirector;