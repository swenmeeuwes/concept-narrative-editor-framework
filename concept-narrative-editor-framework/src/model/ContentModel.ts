class ContentModel {
    private _schemaId: string;
    private _data: Object;

    constructor(schemaId: string, data: Object = {}) {
        this._schemaId = schemaId;
        this._data = data;
    }

    public get Data() {
        return this._data;
    }

    public get SchemaId() {
        return this._schemaId;
    }
}

export default ContentModel;