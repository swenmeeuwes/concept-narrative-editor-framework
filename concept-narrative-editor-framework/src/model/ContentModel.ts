import ContentSchema from '../schema/ContentSchema';

class ContentModel {
    private _schema: ContentSchema;
    private _data: any;

    constructor(schema: ContentSchema, data: Object = {}) {
        this._schema = schema;
        this._data = data;
    }

    public get schema(): ContentSchema {
        return this._schema;
    }

    public get data(): any {
        return this._data;
    }

    public set data(newData: any) {
        this._data = newData;
    }

    public get schemaId() {
        return this._schema.$id;
    }
}

export default ContentModel;