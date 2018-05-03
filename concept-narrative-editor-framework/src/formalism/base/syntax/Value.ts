import Expression from './Expression';
import Type from './Type';

interface Value extends Expression {
    getType(): Type;
    evaluate(): Value;
    toString(): string;
}

export default Value;