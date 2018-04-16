import * as joint from 'jointjs';

import TriggerSystemNode from '../TriggerSystemNode';
import { BoolValue } from '../../base/syntax/Values';

class BoolNode extends TriggerSystemNode {
    private _value: BoolValue;

    constructor(attributes?: any, options?: any) {
        super(attributes, options);
    }

    public set value(value: BoolValue) {
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public defaults(): Backbone.ObjectHash {
        return joint.util.deepSupplement({
            type: 'custom.TriggerSystemBoolNode',
            size: { width: 96, height: 32 },
            attrs: {
                'rect': { width: 96, height: 32 },
                'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', 'fill': 'rgb(0, 0, 0)' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults);
    }
}

export default BoolNode;