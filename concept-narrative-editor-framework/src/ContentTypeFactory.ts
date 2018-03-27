import ContentSchemaWrapper from './schema/ContentSchemaWrapper';
import AssetLoader from './assetloading/AssetLoader';
import ContentTypeNode from './model/ContentTypeNode';

class ContentTypeFactory {
    private static _instance: ContentTypeFactory;

    private _schema: ContentSchemaWrapper;

    public static get Instance(): ContentTypeFactory {
        return this._instance || (this._instance = new ContentTypeFactory());
    }

    public createContent(contentUri?: string): ContentTypeNode {
        if (!this._schema || !this._schema.AvailableContentTypeURIs || this._schema.AvailableContentTypeURIs.length === 0)
            throw '[ContentTypeFactory] Schema must consist of more than one content type';

        // Resort to a default uri if no content uri was given
        if (!contentUri)
            contentUri = this._schema.AvailableContentTypeURIs[0];

        return new ContentTypeNode({
            position: { x: 50, y: 50 },
            size: { width: 96, height: 96 }
        }, contentUri);
    }

    public get AvailableContentTypes(): string[] {
        return this._schema.AvailableContentTypes;
    }

    private constructor() {
        this._schema = AssetLoader.Instance.Library.contentSchemaWrapper;
    }
}

export default ContentTypeFactory;