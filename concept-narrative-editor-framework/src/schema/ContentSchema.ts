type Definitions = {
    propertyTypes: Object;
    contentTypes: Object;
};

class ContentSchema {
    public $schema: string; // URI?
    public $id: string; // URI?
    public description: string;
    public definitions: Definitions;
}

export default ContentSchema;