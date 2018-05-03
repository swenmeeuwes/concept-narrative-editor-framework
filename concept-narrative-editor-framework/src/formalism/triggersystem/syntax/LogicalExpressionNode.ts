import TriggerSystemNode from '../TriggerSystemNode';
import { LogicalExpression } from '../../base/syntax/LogicalExpressions';

class LogicalExpressionNode extends TriggerSystemNode {
    private _expression: LogicalExpression;

    constructor(attributes?: any, options?: any) {
        super(attributes, options);
    }

    public set expression(expression: LogicalExpression) {
        this._expression = expression;
    }

    public get expression() {
        return this._expression;
    }

    public clone() {
        const cloned = super.clone() as LogicalExpressionNode;
        cloned.expression = this.expression;
        
        return cloned;
    }
}

export default LogicalExpressionNode;