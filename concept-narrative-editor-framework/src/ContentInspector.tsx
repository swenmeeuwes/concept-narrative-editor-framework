import * as React from 'react';
import Form, { IChangeEvent } from 'react-jsonschema-form';
import ContentTypeFactory from './ContentTypeFactory';
import ContentTypeModel from './model/ContentTypeNode';
import SchemaHelper from './SchemaHelper';

import './ContentInspector.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

interface Props {
    selectedNode: joint.dia.CellView | null;
}
interface State {
    currentSchema: Object;
    selectedNode: joint.dia.CellView | null;
    title: string;
    formData: Object;
}

class ContentInspector extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            currentSchema: {},
            selectedNode: props.selectedNode,
            title: '',
            formData: {}
        };
    }

    // componentWillMount() {
    //     console.log('inspector will mount', this.state.selectedNode);

    //     if (this.state.selectedNode == null)
    //         return;

    //     const contentTypeModel = this.state.selectedNode.model as ContentTypeModel;

    //     ContentTypeFactory.Instance().readSchema(true)
    //         .then((jsonSchema: any) => {
    //             this.setState({
    //                 currentSchema: jsonSchema.definitions.contentTypes[contentTypeModel.Type]
    //             });
    //         });
    // }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.selectedNode == null)
            return;

        const selectedNode = nextProps.selectedNode as joint.dia.CellView;
        const contentTypeModel = selectedNode.model as ContentTypeModel;

        ContentTypeFactory.Instance().readSchema(true)
            .then((jsonSchema: any) => {
                if (!jsonSchema.definitions.contentTypes.hasOwnProperty(
                    SchemaHelper.TrimPath(contentTypeModel.ContentModel.SchemaId)
                )) {
                    this.setState({
                        currentSchema: {},
                        title: ''
                    });
                    return;
                }

                this.setState({
                    currentSchema: jsonSchema[SchemaHelper.ResolveSchemaId(contentTypeModel.ContentModel.SchemaId)],
                    title: contentTypeModel.ContentModel.SchemaId,
                    formData: {
                        text: ''
                    }
                });
            });
    }

    onValueChanged(formData: IChangeEvent) {
        console.log(formData.formData);
    }

    render() {
        return (
            <div id="inspectorEditWindow">
                <h4>{this.state.title}</h4>
                <Form
                    schema={this.state.currentSchema}
                    // formData={this.state.formData}
                    onChange={this.onValueChanged}
                // onSubmit={this.log('submitted')}
                // onError={this.log('errors')}
                />
            </div>
        );
    }
}

export default ContentInspector;