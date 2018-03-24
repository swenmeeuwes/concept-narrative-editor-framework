import ContentSchema from './ContentSchema';

// Use another schema (root schema) to validate the content schema structure
// => Does it contain definitions for propertyTypes and ContentTypes?
class ContentSchemaWrapper {
    private _schema: ContentSchema;

    constructor(schema: ContentSchema) {
        // todo: Validate schema
        this._schema = schema;
    }

    public get Schema() {
        return this._schema;
    }

    public get Definitions() {
        return this._schema.definitions;
    }

    public get AvailableContentTypes(): string[] {
        return Object.keys(this.Definitions.contentTypes);
    }
}

export default ContentSchemaWrapper;