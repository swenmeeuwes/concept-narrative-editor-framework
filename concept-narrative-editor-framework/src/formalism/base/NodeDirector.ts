import NodeBuilder from '../base/NodeBuilder';
import Node from './Node';

abstract class NodeDirector<T extends Node> {
    protected _builder: NodeBuilder;

    constructor(builder: NodeBuilder) {
        this._builder = builder;
    }

    public abstract construct(): T[];
}

export default NodeDirector;