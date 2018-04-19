import * as joint from 'jointjs';

import TriggerSystemNode from '../TriggerSystemNode';
import Node from '../../base/Node';

class GroupNode extends TriggerSystemNode {
    constructor(attributes?: any, options?: any) {
        super(attributes, options);
    }

    public defaults(): Backbone.ObjectHash {
        return joint.util.deepSupplement({
            type: 'custom.TriggerSystemGroupNode',
            size: { width: 156, height: 156 },
            attrs: {
                'rect': { width: 156, height: 156 },
                'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .1, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', 'fill': 'rgb(0, 0, 0)' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults);
    }

    public validateEmbed(child: Node) {
        return true;
    }
}

export default GroupNode;