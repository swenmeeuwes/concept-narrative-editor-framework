import * as React from 'react';
import TextFormattingUtil from '../util/TextFormattingUtil';

type OnChangeEvent = (event: React.FormEvent<HTMLSelectElement>) => void;

interface Props {
    items: string[];
    onChange?: OnChangeEvent;
    selected?: string;
}

interface State {
    items: string[];
    selected: string;
}

class EnumProperty extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            items: props.items,
            selected: props.selected || props.items[0] // Error will be thrown when an empty array is passed in
        };
    }

    onChange = (event: React.FormEvent<HTMLSelectElement>) => {
        this.setState({
            selected: event.currentTarget.value
        });

        if (this.props.onChange)
            this.props.onChange(event);
    }

    componentWillReceiveProps(nextProps: Props) {
        this.setState({
            items: nextProps.items,
            selected: nextProps.selected || nextProps.items[0]
        });
    }

    render() {
        const options = this.state.items.map(item => (
            <option
                key={item}
                value={item}
            >
                {TextFormattingUtil.camelToSpaces(item)}
            </option>)
        );

        return (
            <select
                value={this.state.selected}
                onChange={this.onChange}
            >
                {options}
            </select>
        );
    }
}

export default EnumProperty;