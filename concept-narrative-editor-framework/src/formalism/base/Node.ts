import * as joint from 'jointjs';

import '../../model/ContentTypeNode.css';
import ExportGeneratingVisitor from './ExportGeneratingVisitor';
import Embeddable from './Embeddable';

abstract class Node extends joint.shapes.basic.Generic implements Embeddable<Node> {
    constructor(attributes: joint.dia.Element.Attributes = {}, options: any = {}) {
        super(attributes, options);

        this.set('markup', `<g class="editor-node">
                                <rect class="body" />
                                <text class="label" />
                            </g>`);
    }

    public defaults(): Backbone.ObjectHash {
        return joint.util.deepSupplement({
            type: 'custom.Node',
            size: { width: 96, height: 96 },
            attrs: {
                'rect': { width: 96, height: 96 },
                'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .15, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', 'fill': 'rgb(0, 0, 0)' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults);
    }

    // todo: use prototype design pattern
    public clone() {
        const nodeBase = super.clone() as Node;
        nodeBase.addPorts(this.getPorts());
        
        return nodeBase;
    }

    public accept(visitor: ExportGeneratingVisitor<any>) {
        visitor.visit(this);
    }

    public validateEmbed(child: Node) {
        return false;
    }
}

export default Node;