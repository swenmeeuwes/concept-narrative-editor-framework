import * as joint from 'jointjs';

class ContentTypeModel extends joint.shapes.devs.Model {
    constructor(attributes: joint.shapes.devs.ModelAttributes) {
      super(attributes);

      this.addInPort('In');
      this.addOutPort('Out');
    }
}
  
export default ContentTypeModel;