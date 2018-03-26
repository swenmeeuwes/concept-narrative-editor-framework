type Definitions = {
    baseContent: Object;
    propertyTypes: Object;
};

type ContentSchema = {
    $schema: string;
    $id: string;
    description: string;
    contentTypes: Object;
    definitions: Definitions;
};

export default ContentSchema;