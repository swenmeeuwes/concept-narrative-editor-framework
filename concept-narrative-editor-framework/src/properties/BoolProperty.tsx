import * as React from 'react';

type OnChangeEvent = (event: React.FormEvent<HTMLInputElement>) => void;

interface Props {
    checked?: boolean;
    onChange?: OnChangeEvent;
}

interface State {
    checked: boolean;
}

export default class BoolProperty extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            checked: props.checked || false
        };
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            checked: event.currentTarget.checked
        });

        if (this.props.onChange)
            this.props.onChange(event);
    }

    render() {
        return (
            <input type="checkbox" className="form-control" onChange={this.onChange} checked={this.state.checked} />
        );
    }
}