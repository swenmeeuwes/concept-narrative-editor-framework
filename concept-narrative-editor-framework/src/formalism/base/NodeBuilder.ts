import Node from './Node';
import EmptyConstructor from './EmptyConstructor';

abstract class NodeBuilder {
    private _node: Node;

    // constructor(nodeType: EmptyConstructor<T>) {
    //     this._node = new nodeType();
    // }

    public build<T extends Node>(nodeType: EmptyConstructor<T>) {
        this._node = new nodeType();
        return this;
    }

    public markup(markup: string) {
        this._node.set('markup', markup);
        return this;
    }

    public label(label: string) {
        this._node.attr('.label', {
            text: label
        });
        return this;
    }

    public allowBodyConnections(allow: boolean = true) {
        this._node.attr('.', { magnet: allow });
        return this;
    }

    public addPort(port: any, options?: any): this {
        this._node.addPort(port, options);
        return this;
    }
    
    // todo: Remove port semantics ... want to use method above
    public addInPort(port: string) {
        // this._node.addInPort(port);
        return this;
    }

    public addOutPort(port: string) {
        // this._node.addOutPort(port);
        return this;
    }

    public getNode<T extends Node>(): T {
        return this._node as T;
    }
}

export default NodeBuilder;