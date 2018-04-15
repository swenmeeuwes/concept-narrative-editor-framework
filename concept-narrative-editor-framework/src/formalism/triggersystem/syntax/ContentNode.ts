import TriggerSystemNode from '../TriggerSystemNode';
import ContentModel from '../../../model/ContentModel';
import SchemaHelper from '../../../schema/SchemaHelper';
import TextFormattingUtil from '../../../util/TextFormattingUtil';
import ContentTypeFactory from '../../../schema/ContentTypeFactory';

class ContentNode extends TriggerSystemNode {
    private _contentModel: ContentModel;

    constructor(attributes?: any, options?: any) {
        super(attributes, options);

        this._contentModel = ContentTypeFactory.Instance.createContent();
    }

    public get ContentModel() {
        return this._contentModel;
    }

    public set ContentModel(newContentModel: ContentModel) {
        this._contentModel = newContentModel;

        let labelText = this._contentModel.Schema.title;
        if (!labelText) {
            const trimmedSchemaId = SchemaHelper.trimRefPath(newContentModel.SchemaId);
            labelText = TextFormattingUtil.camelToSpaces(trimmedSchemaId);
        }

        this.attr('.label', {
            text: labelText
        });
    }
}

export default ContentNode;