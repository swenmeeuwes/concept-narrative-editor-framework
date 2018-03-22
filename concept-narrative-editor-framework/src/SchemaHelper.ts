import * as RefParser from 'json-schema-ref-parser';

class SchemaHelper {
    /**
     * Resolves the schema reference and return the schema that is referenced
     */
    public static ResolveSchemaReference(schema: Object, schemaRef: string, refParser: RefParser = new RefParser()): Promise<Object> {
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

    /**
     * Trims path of schema reference string 
     * E.g. '#/definitions/foo' will return 'foo'
     */
    public static TrimRefPath(schemaRef: string): string {
        const splittedSchemaIdPath = schemaRef.split('/');
        return splittedSchemaIdPath[splittedSchemaIdPath.length - 1];
    }
}

export default SchemaHelper;