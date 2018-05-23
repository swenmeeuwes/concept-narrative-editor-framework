import * as defaults from 'json-schema-defaults';
import ContentSchema from './ContentSchema';

class SchemaHelper {
    /**
     * Resolves a relative URI
     * @param uri URI to resolve
     * @param schema in the given schema
     * @returns the referenced schema
     */
    public static resolveRelativeURI(uri: string, schema: ContentSchema): ContentSchema {
        // Check if the URI is relative
        if (uri.indexOf('#/') === -1)
            throw(`The following URI is not relative: ${uri}`);

        const referencePath = uri.replace('#/', '').split('/');
        return referencePath.reduce((accumulator, current) => accumulator[current], schema);
    }

    /**    
     * Trims path of schema reference string; gets type from URI    
     * E.g. '#/definitions/foo' will return 'foo'
     */
    public static trimRefPath(schemaRef: string): string {
        const splittedSchemaIdPath = schemaRef.split('/');
        return splittedSchemaIdPath[splittedSchemaIdPath.length - 1];
    }

    /**
     * Pad a contentTypeName with definitions/contentTypes path
     * E.g. 'foo' will return '#/definitions/contentTypes/foo'
     */
    public static padContentTypeDefinition(contentTypeName: string) {
        return `#/contentTypes/${contentTypeName}`; // todo: Maybe nice to define prefix in the json schema aswell
    }

    /**
     * Checks if a content type (name or uri) exists in the given schema
     */
    public static contentTypeExists(contentTypeNameOrUri: string, schema: ContentSchema) {
        // Check if the name is an uri with the assumption that each uri starts with '#'
        let isUri;
        if (contentTypeNameOrUri)
            isUri = contentTypeNameOrUri.indexOf('#') === 0;

        const contentTypeKey = isUri ? this.trimRefPath(contentTypeNameOrUri) : contentTypeNameOrUri;
        return schema.contentTypes.hasOwnProperty(contentTypeKey);
    }

    /**
     * Constructs an object with the default values provided by the schema
     */
    public static default(schema: Object): Object {
        return defaults(schema);
    }
}

export default SchemaHelper;