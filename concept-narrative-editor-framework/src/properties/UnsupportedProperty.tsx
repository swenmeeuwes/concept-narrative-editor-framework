import * as React from 'react';
import { Component } from 'react';

interface Props {
    schema: { type?: string };
}

export default class UnsupportedProperty extends Component<Props> {
    render() {
        return (
            <div>JSON-schema type '{this.props.schema.type}' is not supported.</div>
        );
    }
}