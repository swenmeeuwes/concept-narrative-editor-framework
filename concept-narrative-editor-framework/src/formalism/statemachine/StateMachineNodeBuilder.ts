import NodeBuilder from '../base/NodeBuilder';
import StateMachineNode from './StateMachineNode';
import EmptyConstructor from '../base/EmptyConstructor';

class StateMachineNodeBuilder extends NodeBuilder {
    public build(nodeType: EmptyConstructor<StateMachineNode>) {
        return super
            .build(nodeType)
            .allowBodyConnections();
    }
}

export default StateMachineNodeBuilder;