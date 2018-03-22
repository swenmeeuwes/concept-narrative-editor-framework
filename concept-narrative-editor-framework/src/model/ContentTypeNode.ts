import * as joint from 'jointjs';
import ContentModel from './ContentModel';
import SchemaHelper from 'src/SchemaHelper';

// Is more like a mediator between the joint view and content model
class ContentTypeNode extends joint.shapes.devs.Model {
    private _contentModel: ContentModel;

    constructor(attributes: joint.shapes.devs.ModelAttributes, schemaId: string) {
      super(attributes);

      this.ContentModel = new ContentModel(schemaId);

      this.addInPort('In');
      this.addOutPort('Out');
    }

    public get ContentModel() {
      return this._contentModel;
    }

    public set ContentModel(newContentModel: ContentModel) {
      this._contentModel = newContentModel;
      this.attr('.label', { 
        text: SchemaHelper.TrimPath(newContentModel.SchemaId), 
        'ref-x': .5, 
        'ref-y': .2 
      });
    }
}
  
export default ContentTypeNode;