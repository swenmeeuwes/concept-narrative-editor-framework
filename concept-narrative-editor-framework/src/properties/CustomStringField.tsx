import * as React from 'react';

const CustomStringField = (props: any) => {
    console.log(props);
    if (props.schema.assetType && props.schema.assetType === 'image') {
        const style = {color: 'blue'};
        return (
            <input style={style} onChange={(event) => props.onChange(event.currentTarget.value)} value={props.value} />
        );
    }
    return (
        <input onChange={(event) => props.onChange(event.currentTarget.value)} value={props.value} />
    );
};

export default CustomStringField;