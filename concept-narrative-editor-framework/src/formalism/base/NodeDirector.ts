import NodeBuilder from '../base/NodeBuilder';
import Node from './Node';

abstract class NodeDirector<T extends Node> {
    protected _builder: NodeBuilder<T>;

    constructor(builder: NodeBuilder<T>) {
        this._builder = builder;
    }

    public abstract construct(): T[];
}

export default NodeDirector;