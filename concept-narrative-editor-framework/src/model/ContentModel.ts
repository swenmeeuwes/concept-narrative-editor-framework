import ContentSchema from '../schema/ContentSchema';

class ContentModel {
    private _schema: ContentSchema;
    private _data: any;

    constructor(schema: ContentSchema, data: Object = {}) {
        this._schema = schema;
        this._data = data;
    }

    public get Schema(): ContentSchema {
        return this._schema;
    }

    public get Data(): any {
        return this._data;
    }

    public set Data(newData: any) {
        this._data = newData;
    }

    public get SchemaId() {
        return this._schema.$id;
    }
}

export default ContentModel;