import ContentSchemaWrapper from '../schema/ContentSchemaWrapper';
import AssetLoader from '../io/AssetLoader';
import SchemaHelper from '../schema/SchemaHelper';
import ContentModel from '../model/ContentModel';

class ContentTypeFactory {
    private static _instance: ContentTypeFactory;

    private _schema: ContentSchemaWrapper;

    public static get Instance(): ContentTypeFactory {
        return this._instance || (this._instance = new ContentTypeFactory());
    }

    public createContent(contentSchemaUri?: string): ContentModel {
        if (!this._schema || !this._schema.AvailableContentTypeURIs || this._schema.AvailableContentTypeURIs.length === 0)
            throw '[ContentTypeFactory] Schema must consist of more than one content type';

        // Resort to a default uri if no content uri was given
        if (!contentSchemaUri)
            contentSchemaUri = this._schema.AvailableContentTypeURIs[0];

        const schemaData = SchemaHelper.resolveURI(contentSchemaUri, this._schema.FlatSchema);
        return new ContentModel(schemaData, {});
    }

    public get AvailableContentTypes(): string[] {
        return this._schema.AvailableContentTypes;
    }

    private constructor() {
        this._schema = AssetLoader.Instance.Library.contentSchemaWrapper;
    }
}

export default ContentTypeFactory;