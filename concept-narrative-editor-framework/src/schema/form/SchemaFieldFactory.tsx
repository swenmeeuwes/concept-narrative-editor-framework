import * as React from 'react';
import Properties from '../../properties/Properties';
import UnsupportedProperty from '../../properties/UnsupportedProperty';
import BoolProperty from '../../properties/BoolProperty';
import StringProperty from '../../properties/StringProperty';
import NumberProperty from '../../properties/NumberProperty';

export default class SchemaFieldFactory {
    private static _instance: SchemaFieldFactory;

    public static get instance() {
        return (this._instance || (this._instance = new SchemaFieldFactory()));
    }

    public create(schema: { type?: string }) {
        if (!schema.type)
            return (<div />);

        switch (schema.type) {
            case Properties.Boolean:
                return (<BoolProperty />);
            case Properties.String:
                return (<StringProperty />);
            case Properties.Number:
                return (<NumberProperty />);
            default:
                return (<UnsupportedProperty schema={schema} />);
        }
    }

    private constructor() { }
}