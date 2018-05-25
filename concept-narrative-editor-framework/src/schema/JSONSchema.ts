export default interface JSONSchema {
    $schema?: string;
    $id?: string;
    $ref?: string;
    type?: string;
    properties?: JSONSchema[];
}