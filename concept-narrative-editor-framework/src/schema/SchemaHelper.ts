import * as RefParser from 'json-schema-ref-parser';
import ContentSchema from './ContentSchema';

class SchemaHelper {
    /**
     * @Obsolete
     * Resolves the schema reference and return the schema that is referenced
     */
    public static resolveSchemaReference(schema: Object, schemaRef: string, refParser: RefParser = new RefParser()): Promise<Object> {
        return new Promise((resolve, reject) => {
            const schemaRefHierarchy = schemaRef.replace('#', '').split('/');
            if (schemaRefHierarchy[0] === '')
                schemaRefHierarchy.shift();

            refParser.dereference(schema).then((dereferencedSchema) => {
                const resolvedSchema = schemaRefHierarchy.reduce((accumulator, current) => accumulator[current], schema);
                resolve(resolvedSchema);
            }).catch((err) => {
                reject(err);
            });
        });
    }

    public static resolveURI(uri: string, schema: ContentSchema): Object {
        const schemaRefHierarchy = uri.replace('#', '').split('/');
        if (schemaRefHierarchy[0] === '')
            schemaRefHierarchy.shift();

        return schemaRefHierarchy.reduce((accumulator, current) => accumulator[current], schema);
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
        return `#/contentTypes/${contentTypeName}`; // Maybe nice to define prefix in the json schema aswell
    }
}

export default SchemaHelper;