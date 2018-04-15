import Node from './Node';
import EmptyConstructor from './EmptyConstructor';

abstract class NodeBuilder<T extends Node> {
    private _node: T;

    // constructor(nodeType: EmptyConstructor<T>) {
    //     this._node = new nodeType();
    // }

    public build(nodeType: EmptyConstructor<T>): NodeBuilder<T> {
        this._node = new nodeType();
        return this;
    }

    public markup(markup: string): NodeBuilder<T> {
        this._node.set('markup', markup);
        return this;
    }

    public label(label: string): NodeBuilder<T> {
        this._node.attr('.label', {
            text: label
        });
        return this;
    }

    public allowBodyConnections(allow: boolean = true): NodeBuilder<T> {
        this._node.attr('.', { magnet: allow });
        return this;
    }

    // public addPort(port: joint.dia.Element.Port, options?: any): NodeBuilder<T> {
    //     this._node.addPort(port, options);
    //     return this;
    // }
    
    // todo: Remove port semantics ... want to use method above
    public addInPort(port: string) {
        this._node.addInPort(port);
        return this;
    }

    public addOutPort(port: string) {
        this._node.addOutPort(port);
        return this;
    }

    public getNode(): T {
        return this._node;
    }
}

export default NodeBuilder;