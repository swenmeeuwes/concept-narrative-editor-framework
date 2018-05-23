import * as React from 'react';

type OnChangeEvent = (event: React.FormEvent<HTMLInputElement>) => void;

interface Props {
    value?: number;
    onChange?: OnChangeEvent;
}

interface State {
    value: number;
}

export default class NumberProperty extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            value: props.value || 0
        };
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        if (!event.currentTarget.valueAsNumber)
            return;

        this.setState({
            value: event.currentTarget.valueAsNumber
        });

        if (this.props.onChange)
            this.props.onChange(event);
    }

    render() {
        return (
            <input type="number" className="form-control" onChange={this.onChange} value={this.state.value} />
        );
    }
}