import * as Ajv from 'ajv';
import * as RefParser from 'json-schema-ref-parser';

import ContentSchema from './ContentSchema';
import SchemaHelper from './SchemaHelper';

const resolveAllOf = require('json-schema-resolve-allof');

// Use another schema (root schema) to validate the content schema structure
// => Does it contain definitions for propertyTypes and ContentTypes?
class ContentSchemaWrapper {
    private _schemaValidator: Ajv.Ajv;
    private _validate: Ajv.ValidateFunction;
    private _refParser: RefParser;

    private _schema: ContentSchema;
    private _flatSchema: ContentSchema;

    constructor(schema: ContentSchema) {
        this._schemaValidator = new Ajv();
        this._refParser = new RefParser();

        // Prepare validation function
        this._validate = this._schemaValidator.compile(schema);

        this._schema = schema;

        // Proces the schema to a 'flat' version of the schema
        // In this version all '$ref' and 'allOf' fields are resolved
        this.dereference(schema)
            .then(dereferencedSchema => {
                this._flatSchema = this.merge(dereferencedSchema);
            })
            .catch(err => {
                throw err;
            });
    }

    public validate(data: Object): boolean {
        return this._validate(data) as boolean;
    }

    public get Schema() {
        return this._schema;
    }

    public get FlatSchema() {
        return this._flatSchema;
    }

    public get AvailableContentTypes(): string[] {
        return Object.keys(this._schema.contentTypes);
    }

    public get AvailableContentTypeURIs(): string[] {
        return Object.keys(this._schema.contentTypes).map(contentType => SchemaHelper.padContentTypeDefinition(contentType));
    }

    /**
     * Makes a deep copy of the given JSON schema
     * Resolves all '$ref' fields of this clone
     */
    private dereference(schema: ContentSchema): Promise<ContentSchema> {
        const schemaClone = this.clone(schema);
        return new Promise((resolve, reject) => {
            this._refParser.dereference(schemaClone).then((dereferencedSchema) => {
                resolve(dereferencedSchema as ContentSchema);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    /**
     * Makes a deep copy of the given JSON schema
     * Merges all 'allOf' fields of this clone
     */
    private merge(schema: ContentSchema): ContentSchema {
        const schemaClone = this.clone(schema);
        return resolveAllOf(schemaClone);
    }

    /**
     * Deep clone which makes a copy of the provided JSON and maps it to the ContentSchema type
     */
    private clone(json: Object): ContentSchema {
        return JSON.parse(JSON.stringify(json)) as ContentSchema;
    }
}

export default ContentSchemaWrapper;