import * as React from 'react';
import { Component } from 'react';
import JSONSchema from '../JSONSchema';
import SchemaFieldFactory from './SchemaFieldFactory';

interface Props {
    schema: JSONSchema;
    // data
    // onchange event
}
interface State { }

export default class SchemaForm extends Component<Props, State> {
    public render() {
        return this.composeForm(this.props.schema);
    }

    private composeForm(schema: JSONSchema): JSX.Element[] {
        if (!schema.properties)
            return [<div key={1} />];

        let form: JSX.Element[] = [];
        for (const property of Object.keys(schema.properties)) {
            form.push(<div>property</div>);
            const propertySchema = schema.properties[property];
            if (propertySchema.type)
                form.push(SchemaFieldFactory.instance.create(propertySchema));
        }

        return form.map((item, index) => {
            item.key = index;
            return item;
        });
    }
}