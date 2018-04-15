import * as joint from 'jointjs';

import '../../model/ContentTypeNode.css';

abstract class Node extends joint.shapes.basic.Generic {
    constructor(attributes: joint.dia.Element.Attributes = {}, options: any = {}) {
        super(attributes, options);

        this.set('markup', `<g class="content-type-node">
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
}

export default Node;