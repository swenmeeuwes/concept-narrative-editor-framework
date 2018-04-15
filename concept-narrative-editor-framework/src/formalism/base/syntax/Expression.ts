import Value from './Value';
import Type from './Type';

interface Expression {
    evaluate(): Value;
    getType(): Type;
}

export default Expression;