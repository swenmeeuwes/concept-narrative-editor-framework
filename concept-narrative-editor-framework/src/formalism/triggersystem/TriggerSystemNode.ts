import * as joint from 'jointjs';

import Node from '../base/Node';
import { TriggerSystemPortGroups } from './TriggerSystemPorts';

class TriggerSystemNode extends Node {
    constructor(attributes?: joint.dia.Element.Attributes, options?: any) {
        super(attributes, options);

        this.prop('ports', {
            groups: TriggerSystemPortGroups
        });
    }

    public defaults(): Backbone.ObjectHash {
        return joint.util.deepSupplement({
            type: 'custom.TriggerSystemNode',
            size: { width: 96, height: 96 },
            attrs: {
                'rect': { width: 96, height: 96 },
                'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .15, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', 'fill': 'rgb(0, 0, 0)' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults);
    }
}

export default TriggerSystemNode;