import NodeBuilder from '../base/NodeBuilder';
import TriggerSystemNode from './TriggerSystemNode';
import EmptyConstructor from '../base/EmptyConstructor';

class TriggerSystemNodeBuilder extends NodeBuilder {
    public build(nodeType: EmptyConstructor<TriggerSystemNode>) {
        return super
            .build(nodeType)
            .allowBodyConnections(false);
    }
}

export default TriggerSystemNodeBuilder;