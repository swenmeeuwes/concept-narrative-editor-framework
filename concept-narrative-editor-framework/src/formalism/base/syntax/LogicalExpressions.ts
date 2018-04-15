import Expression from './Expression';
import { BoolType } from './Types';
import { BoolValue } from './Values';

abstract class LogicalExpression implements Expression {
    public abstract evaluate();

    public getType() {
        return new BoolType();
    }
}

class Equals extends LogicalExpression {
    private _left: Expression;
    private _right: Expression;

    constructor(left: Expression, right: Expression) {
        super();

        this._left = left;
        this._right = right;
    }

    public evaluate() {
        // Types must be bools
        if (!(this._left.getType() instanceof BoolType) || !(this._right.getType() instanceof BoolType))
            throw `Logical expression can only evaluate booleans`;

        // And must match
        if (this._left.getType() === this._right.getType())
            throw `${this._left.getType()} and ${this._right.getType()} 
                    are not of the same type and thus can't be evaluated`;

        return new BoolValue((this._left.evaluate() as BoolValue).value === (this._right.evaluate() as BoolValue).value);
    }
}

class And extends LogicalExpression {
    private _left: Expression;
    private _right: Expression;

    constructor(left: Expression, right: Expression) {
        super();

        this._left = left;
        this._right = right;
    }

    public evaluate() {
        // Types must be bools
        if (!(this._left.getType() instanceof BoolType) || !(this._right.getType() instanceof BoolType))
            throw `Logical expression can only evaluate booleans`;

        // And must match
        if (this._left.getType() === this._right.getType())
            throw `${this._left.getType()} and ${this._right.getType()} 
                    are not of the same type and thus can't be evaluated`;

        return new BoolValue((this._left.evaluate() as BoolValue).value && (this._right.evaluate() as BoolValue).value);
    }
}

class Or extends LogicalExpression {
    private _left: Expression;
    private _right: Expression;

    constructor(left: Expression, right: Expression) {
        super();

        this._left = left;
        this._right = right;
    }

    public evaluate() {
        // Types must be bools
        if (!(this._left.getType() instanceof BoolType) || !(this._right.getType() instanceof BoolType))
            throw `Logical expression can only evaluate booleans`;

        // And must match
        if (this._left.getType() === this._right.getType())
            throw `${this._left.getType()} and ${this._right.getType()} 
                    are not of the same type and thus can't be evaluated`;

        return new BoolValue((this._left.evaluate() as BoolValue).value || (this._right.evaluate() as BoolValue).value);
    }
}

class GreaterThan extends LogicalExpression {
    private _left: Expression;
    private _right: Expression;

    constructor(left: Expression, right: Expression) {
        super();

        this._left = left;
        this._right = right;
    }

    public evaluate() {
        // Types must be bools
        if (!(this._left.getType() instanceof BoolType) || !(this._right.getType() instanceof BoolType))
            throw `Logical expression can only evaluate booleans`;

        // And must match
        if (this._left.getType() === this._right.getType())
            throw `${this._left.getType()} and ${this._right.getType()} 
                    are not of the same type and thus can't be evaluated`;

        return new BoolValue((this._left.evaluate() as BoolValue).value > (this._right.evaluate() as BoolValue).value);
    }
}

class LessThan extends LogicalExpression {
    private _left: Expression;
    private _right: Expression;

    constructor(left: Expression, right: Expression) {
        super();

        this._left = left;
        this._right = right;
    }

    public evaluate() {
        // Types must be bools
        if (!(this._left.getType() instanceof BoolType) || !(this._right.getType() instanceof BoolType))
            throw `Logical expression can only evaluate booleans`;

        // And must match
        if (this._left.getType() === this._right.getType())
            throw `${this._left.getType()} and ${this._right.getType()} 
                    are not of the same type and thus can't be evaluated`;

        return new BoolValue((this._left.evaluate() as BoolValue).value < (this._right.evaluate() as BoolValue).value);
    }
}

class Not extends LogicalExpression {
    private _expr: Expression;

    constructor(expr: Expression) {
        super();

        this._expr = expr;
    }

    public evaluate() {
        // Type must be a bool
        if (!(this._expr.getType() instanceof BoolType))
            throw `Logical expression can only evaluate booleans`;

        return new BoolValue(!(this._expr.evaluate() as BoolValue).value);
    }
}

export { LogicalExpression, Equals, And, Or, GreaterThan, LessThan, Not };