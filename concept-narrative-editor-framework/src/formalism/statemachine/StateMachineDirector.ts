import StateMachineNode from './StateMachineNode';
import NodeDirector from '../base/NodeDirector';
import { OutPort } from './StateMachinePorts';

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
            .addPort(OutPort)
            .getNode();
    }
}

export default StateMachineDirector;