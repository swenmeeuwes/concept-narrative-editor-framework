import ContentSchema from '../schema/ContentSchema';
import SchemaHelper from '../schema/SchemaHelper';

class ContentModel {
    private _schema: ContentSchema;
    private _data: any;

    constructor(schema: any, data?: Object) {
        this._schema = schema;
        this._data = data || SchemaHelper.default(schema);
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