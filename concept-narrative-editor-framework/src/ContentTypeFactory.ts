import * as Ajv from 'ajv';

import ContentSchemaWrapper from './schema/ContentSchemaWrapper';
import AssetLoader from './assetloading/AssetLoader';

class ContentTypeFactory {
    private static _instance: ContentTypeFactory;

    private _schemaValidator: Ajv.Ajv;
    private _schema: ContentSchemaWrapper;

    public static Instance(): ContentTypeFactory {
        return this._instance || (this._instance = new ContentTypeFactory());
    }
    
    private constructor() {
        this._schemaValidator = new Ajv();

        this._schema = AssetLoader.Instance.Library.contentSchemaWrapper;
        this._schemaValidator.validate(this._schema, {}); // todo: move to content schema wrapper?
    }
}

export default ContentTypeFactory;