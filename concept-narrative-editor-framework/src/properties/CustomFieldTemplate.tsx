import * as React from 'react';

export default function CustomFieldTemplate(props: any) {
    const { id, classNames, label, help, required, description, errors, children } = props;

    // Get assetType by:
    // children.filter(child => child.props.schema.assetType

    return (
        <div className={classNames}>
            <label htmlFor={id}>{label}{required ? '*' : null}</label>
            {description}
            {children}
            {errors}
            {help}
        </div>
    );
}