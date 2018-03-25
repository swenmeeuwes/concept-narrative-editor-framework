import * as React from 'react';
import Form, { IChangeEvent } from 'react-jsonschema-form';
import ContentTypeNode from '../model/ContentTypeNode';
import ContentSchemaWrapper from '../schema/ContentSchemaWrapper';
import SchemaHelper from '../SchemaHelper';
import AssetLoader from '../assetloading/AssetLoader';

import './ContentInspector.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';

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
    private _contentSchemaWrapper: ContentSchemaWrapper;

    constructor(props: Props) {
        super(props);

        this._contentSchemaWrapper = AssetLoader.Instance.Library.contentSchemaWrapper;

        this.state = {
            currentSchema: {},
            selectedNode: props.selectedNode,
            title: '',
            formData: {}
        };
    }

    componentWillReceiveProps(nextProps: Props) {
        if (nextProps.selectedNode === null) {
            this.clear();
            return;
        }

        const selectedNode = nextProps.selectedNode;
        const contentTypeNode = selectedNode.model as ContentTypeNode;

        const contentModel = contentTypeNode.ContentModel;
        if (contentModel === undefined)
            return;

        const contentTypeExists = this._contentSchemaWrapper.Definitions.contentTypes.hasOwnProperty(SchemaHelper.TrimRefPath(contentModel.SchemaId));
        if (!contentTypeExists) {
            this.setState({
                currentSchema: {},
                title: ''
            });
            return;
        }

        SchemaHelper.ResolveSchemaReference(this._contentSchemaWrapper.Schema, contentModel.SchemaId).then((resolvedSchema) => {
            this.setState({
                selectedNode: selectedNode,
                currentSchema: resolvedSchema,
                title: SchemaHelper.TrimRefPath(contentModel.SchemaId),
                formData: contentModel.Data
            });
        });
    }

    onValueChanged = (event: IChangeEvent) => {
        if (this.state.selectedNode !== null) {
            const contentTypeNode = this.state.selectedNode.model as ContentTypeNode;
            contentTypeNode.ContentModel.Data = event.formData;
        }
    }

    onSubmit = (formData: FormData) => {
        // Might be overkill, since it is already set in onValueChanged ...
        if (this.state.selectedNode !== null) {
            const contentTypeNode = this.state.selectedNode.model as ContentTypeNode;
            contentTypeNode.ContentModel.Data = formData;
        }

        if (this.state.selectedNode !== null)
            this.state.selectedNode.unhighlight();

        this.clear();
    }

    render() {
        if (this.state.selectedNode === null)
            return (<div />);

        return (
            <div id="inspectorEditWindow">
                <h4>{this.state.title}</h4>
                <Form
                    schema={this.state.currentSchema}
                    formData={this.state.formData}
                    onChange={this.onValueChanged}
                    onSubmit={this.onSubmit}
                // onError={this.log('errors')}
                >
                    <div /> {/* Removes default rendered 'submit' button */}
                </Form>
            </div>
        );
    }

    private clear() {
        this.setState({
            selectedNode: null,
            currentSchema: {},
            title: '',
            formData: {}
        });
    }
}

export default ContentInspector;