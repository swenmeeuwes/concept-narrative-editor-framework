import * as React from 'react';
import Form, { IChangeEvent, ISubmitEvent } from 'react-jsonschema-form';

import ContentNode from '../formalism/triggersystem/syntax/ContentNode';
import ContentSchemaWrapper from '../schema/ContentSchemaWrapper';
import SchemaHelper from '../schema/SchemaHelper';
import AssetLoader from '../io/AssetLoader';
import TextFormattingUtil from '../util/TextFormattingUtil';

import EnumProperty from '../properties/EnumProperty';
import ContentTypeFactory from '../schema/ContentTypeFactory';

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
        if (nextProps.selectedNode === null || !(nextProps.selectedNode.model instanceof ContentNode)) {
            this.clear();
            return;
        }

        const selectedNode = nextProps.selectedNode;
        const contentTypeNode = selectedNode.model as ContentNode;

        const contentModel = contentTypeNode.contentModel;
        if (!contentModel)
            return;

        const contentTypeExists = SchemaHelper.contentTypeExists(contentModel.schemaId, this._contentSchemaWrapper.Schema);
        if (!contentTypeExists) {
            this.setState({
                currentSchema: {},
                title: ''
            });
            return;
        }

        this.setState({
            selectedNode: selectedNode,
            currentSchema: SchemaHelper.resolveURI(contentModel.schemaId, this._contentSchemaWrapper.FlatSchema),
            title: TextFormattingUtil.camelToSpaces(SchemaHelper.trimRefPath(contentModel.schemaId)),
            formData: contentModel.data
        });
    }

    render() {
        if (this.state.selectedNode === null)
            return (<div />);

        const contentTypeNode = this.state.selectedNode.model as ContentNode;
        const contentType = SchemaHelper.trimRefPath(contentTypeNode.contentModel.schemaId);
        
        return (
            <div id="inspectorEditWindow">
                <h4>Type</h4>
                <EnumProperty
                    items={this._availableContentTypes}
                    selected={contentType}
                    onChange={this.onContentTypeChange}
                />
                <hr />
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
            const contentTypeNode = this.state.selectedNode.model as ContentNode;
            contentTypeNode.contentModel.data = event.formData;
        }
    }

    private onContentDataSubmit = (event: ISubmitEvent<any>) => {
        // Might be overkill, since it is already set in onValueChanged ...
        if (this.state.selectedNode !== null) {
            const contentTypeNode = this.state.selectedNode.model as ContentNode;
            contentTypeNode.contentModel.data = event.formData;
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

        const contentTypeNode = this.state.selectedNode.model as ContentNode;
        contentTypeNode.contentModel = ContentTypeFactory.Instance.createContent(SchemaHelper.padContentTypeDefinition(selectedValue));

        const contentModel = contentTypeNode.contentModel;
        this.setState({
            currentSchema: SchemaHelper.resolveURI(contentModel.schemaId, this._contentSchemaWrapper.FlatSchema),
            title: TextFormattingUtil.camelToSpaces(SchemaHelper.trimRefPath(contentModel.schemaId)),
            formData: contentModel.data
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