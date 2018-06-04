import * as React from 'react';
import { FormEvent } from 'react';
import Form, { IChangeEvent } from 'react-jsonschema-form';

import TriggerSystemNode from '../TriggerSystemNode';
import ContentModel from '../../../model/ContentModel';
import SchemaHelper from '../../../schema/SchemaHelper';
import TextFormattingUtil from '../../../util/TextFormattingUtil';
import ContentTypeFactory from '../../../schema/ContentTypeFactory';
import EnumProperty from '../../../properties/EnumProperty';
import CustomStringField from '../../../properties/CustomStringField';

class ContentNode extends TriggerSystemNode {
    private _contentModel: ContentModel;
    private _availableContentTypes: string[];

    constructor(attributes?: any, options?: any) {
        super(attributes, options);

        this._contentModel = ContentTypeFactory.Instance.createContent();
        this._availableContentTypes = ContentTypeFactory.Instance.AvailableContentTypes;
    }

    public get contentModel() {
        return this._contentModel;
    }

    public set contentModel(newContentModel: ContentModel) {
        this._contentModel = newContentModel;

        let labelText = this._contentModel.schema.title;
        if (!labelText) {
            const trimmedSchemaId = SchemaHelper.trimRefPath(newContentModel.schemaId);
            labelText = TextFormattingUtil.camelToSpaces(trimmedSchemaId);
        }

        this.attr('.label', {
            text: labelText
        });
    }

    public render() {
        const contentType = SchemaHelper.trimRefPath(this._contentModel.schemaId);
        const schema = this._contentModel.schema as any;

        const widgets = {
            BaseInput: CustomStringField
        };

        return (
            <div>
                <h4>Type</h4>
                <EnumProperty
                    items={this._availableContentTypes}
                    selected={contentType}
                    onChange={this.onContentTypeChange}
                />
                <hr />
                <Form
                    schema={schema}
                    widgets={widgets}
                    formData={this._contentModel.data}
                    onChange={this.onContentDataValueChanged}
                >
                    <div /> {/* Removes default rendered 'submit' button */}
                </Form>
            </div>
        );
    }

    private onContentTypeChange = (event: FormEvent<HTMLSelectElement>) => {
        const selectedValue = event.currentTarget.value;

        // First check if it is an available content type
        if (this._availableContentTypes.indexOf(selectedValue) === -1)
            return;

        this.contentModel = ContentTypeFactory.Instance.createContent(SchemaHelper.padContentTypeDefinition(selectedValue));
    }

    private onContentDataValueChanged = (event: IChangeEvent) => {
        this.contentModel.data = event.formData;
    }
}
export default ContentNode;