class SchemaHelper {
    public static ResolveSchemaId(schemaId: string): string {
        return schemaId.replace('#', '')
            .replace('/', '.');
    }

    public static TrimPath(schemaId: string): string {
        const splittedSchemaIdPath = schemaId.split('/');
        return splittedSchemaIdPath[splittedSchemaIdPath.length - 1];
    }
}

export default SchemaHelper;