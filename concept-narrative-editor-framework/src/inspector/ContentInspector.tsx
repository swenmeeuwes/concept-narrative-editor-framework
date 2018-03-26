import * as React from 'react';
import Form, { IChangeEvent } from 'react-jsonschema-form';

import ContentTypeNode from '../model/ContentTypeNode';
import ContentSchemaWrapper from '../schema/ContentSchemaWrapper';
import SchemaHelper from '../util/SchemaHelper';
import AssetLoader from '../assetloading/AssetLoader';
import TextFormattingUtil from '../util/TextFormattingUtil';
import ContentModel from '../model/ContentModel';

import './ContentInspector.css';
import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import EnumProperty from '../property/EnumProperty';

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
    private _availableContentTypes: string[];

    constructor(props: Props) {
        super(props);

        this._contentSchemaWrapper = AssetLoader.Instance.Library.contentSchemaWrapper;
        this._availableContentTypes = this._contentSchemaWrapper.AvailableContentTypes;

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

        const contentTypeExists = this._contentSchemaWrapper.Definitions.contentTypes.hasOwnProperty(SchemaHelper.trimRefPath(contentModel.SchemaId));
        if (!contentTypeExists) {
            this.setState({
                currentSchema: {},
                title: ''
            });
            return;
        }

        SchemaHelper.resolveSchemaReference(this._contentSchemaWrapper.Schema, contentModel.SchemaId).then((resolvedSchema) => {
            this.setState({
                selectedNode: selectedNode,
                currentSchema: resolvedSchema,
                title: TextFormattingUtil.camelToSpaces(SchemaHelper.trimRefPath(contentModel.SchemaId)),
                formData: contentModel.Data
            });
        });
    }

    render() {
        if (this.state.selectedNode === null)
            return (<div />);

        const contentTypeNode = this.state.selectedNode.model as ContentTypeNode;
        const contentType = SchemaHelper.trimRefPath(contentTypeNode.ContentModel.SchemaId);
        return (
            <div id="inspectorEditWindow">
                <h4>Type</h4>
                <EnumProperty
                    items={this._availableContentTypes}
                    selected={contentType}
                    onChange={this.onContentTypeChange}
                />
                <hr />
                <h4>{this.state.title}</h4>
                <Form
                    schema={this.state.currentSchema}
                    formData={this.state.formData}
                    onChange={this.onContentDataValueChanged}
                    onSubmit={this.onContentDataSubmit}
                // onError={this.log('errors')}
                >
                    <div /> {/* Removes default rendered 'submit' button */}
                </Form>
            </div>
        );
    }

    private onContentDataValueChanged = (event: IChangeEvent) => {
        if (this.state.selectedNode !== null) {
            const contentTypeNode = this.state.selectedNode.model as ContentTypeNode;
            contentTypeNode.ContentModel.Data = event.formData;
        }
    }

    private onContentDataSubmit = (formData: FormData) => {
        // Might be overkill, since it is already set in onValueChanged ...
        if (this.state.selectedNode !== null) {
            const contentTypeNode = this.state.selectedNode.model as ContentTypeNode;
            contentTypeNode.ContentModel.Data = formData;
        }

        if (this.state.selectedNode !== null)
            this.state.selectedNode.unhighlight();

        this.clear();
    }

    private onContentTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
        const selectedValue = event.currentTarget.value;

        // First check if it is an available content type
        if (this._contentSchemaWrapper.AvailableContentTypes.indexOf(selectedValue) === -1)
            return; // Reject

        if (!this.state.selectedNode)
            return;

        const contentTypeNode = this.state.selectedNode.model as ContentTypeNode;
        contentTypeNode.ContentModel = new ContentModel(SchemaHelper.padContentTypeDefinition(selectedValue));

        const contentModel = contentTypeNode.ContentModel;
        SchemaHelper.resolveSchemaReference(this._contentSchemaWrapper.Schema, contentModel.SchemaId).then((resolvedSchema) => {
            this.setState({
                currentSchema: resolvedSchema,
                title: TextFormattingUtil.camelToSpaces(SchemaHelper.trimRefPath(contentModel.SchemaId)),
                formData: contentModel.Data
            });
        });
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