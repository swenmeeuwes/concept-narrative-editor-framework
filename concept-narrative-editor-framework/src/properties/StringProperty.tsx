import * as React from 'react';

type OnChangeEvent = (event: React.FormEvent<HTMLInputElement>) => void;

interface Props {
    onChange?: OnChangeEvent;
}

interface State {
    text: string;
}

class StringProperty extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            text: ''
        };
    }

    onChange = (event: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            text: event.currentTarget.value
        });

        if (this.props.onChange)
            this.props.onChange(event);
    }

    render() {
        return (
            <input type="text" className="form-control" onChange={this.onChange} />
        );
    }
}

export default StringProperty;