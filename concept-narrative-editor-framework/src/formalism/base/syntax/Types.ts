import Type from './Type';

/**
 * These are here because typeof returns a string
 * And comparing strings as a type check, rather not.
 */

class BoolType implements Type {
    public static get Type(): string {
        return new BoolType().getType();
    }

    public getType(): string {
        return typeof(true); // Get type of boolean ...
    }
}

class NumberType implements Type {
    public static get Type(): string {
        return new NumberType().getType();
    }

    public getType(): string {
        return typeof(1); // Get type of number ...
    }
}

class StringType implements Type {
    public static get Type(): string {
        return new StringType().getType();
    }

    public getType(): string {
        return typeof(' '); // Get type of string ...
    }
}

export { BoolType, NumberType, StringType };