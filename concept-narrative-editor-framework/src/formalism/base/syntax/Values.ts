import Value from './Value';
import Type from './Type';
import { BoolType } from './Types';

class BoolValue implements Value {
    private _value: boolean;

    constructor(value: boolean) {
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public getType(): Type {
        return new BoolType();
    }

    public evaluate(): Value {
        return new BoolValue(this._value);
    }

    public toString() {
        return this._value.toString();
    }
}

class NumberValue implements Value {
    private _value: number;

    constructor(value: number) {
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public getType(): Type {
        return new BoolType();
    }

    public evaluate(): Value {
        return new NumberValue(this._value);
    }

    public toString() {
        return this._value.toString();
    }
}

class StringValue implements Value {
    private _value: string;

    constructor(value: string) {
        this._value = value;
    }

    public get value() {
        return this._value;
    }

    public getType(): Type {
        return new BoolType();
    }

    public evaluate(): Value {
        return new StringValue(this._value);
    }

    public toString() {
        return this._value.toString();
    }
}

export { BoolValue, NumberValue, StringValue };