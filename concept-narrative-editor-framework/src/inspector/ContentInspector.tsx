import * as React from 'react';

import Inspectable from '../formalism/base/Inspectable';

import './ContentInspector.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

interface Props {
    selectedInspectable: Inspectable | null;
}
interface State {

}

class ContentInspector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);
    }

    render() {
        let body = (<div />);

        if (this.props.selectedInspectable !== null)
            body = this.props.selectedInspectable.render();

        return (
            <div id="inspectorEditWindow">
                {body}
            </div>
        );
    }
}

export default ContentInspector;