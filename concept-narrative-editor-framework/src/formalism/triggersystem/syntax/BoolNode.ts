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
}

export default BoolNode;