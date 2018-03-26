import * as joint from 'jointjs';
import ContentModel from './ContentModel';
import SchemaHelper from '../util/SchemaHelper';
import TextFormattingUtil from '../util/TextFormattingUtil';

import './ContentTypeNode.css';

// Is more like a mediator between the joint view and content model
// class ContentTypeNode extends joint.shapes.devs.Model.extend({
//   markup: '<g class="rotatable"><g class="scalable"><rect/></g><text/></g>'
// })

class ContentTypeNode extends joint.shapes.devs.Model {
  private _contentModel: ContentModel;

  constructor(attributes: joint.shapes.devs.ModelAttributes, schemaId: string) {
    attributes.inPorts = ['in'];
    attributes.outPorts = ['out'];

    super(attributes);

    // Move to external file?
    // Add <g class="rotatable"><g class="scalable">?
    this.set('markup',
      `<g class="content-type-node">
      <defs>
      <clipPath id="textClip">
      <rect x="-42" width="84" height="35" />
      </clipPath>
      </defs>

      <rect class="body" />
      <text class="label" clip-path="url(#textClip)" />
      </g>`);

    this.set('portMarkup', `<circle class="port-body"/>`);

    this.ContentModel = new ContentModel(schemaId);
  }

  public get ContentModel() {
    return this._contentModel;
  }

  public set ContentModel(newContentModel: ContentModel) {
    this._contentModel = newContentModel;

    let labelText = SchemaHelper.trimRefPath(newContentModel.SchemaId);
    labelText = TextFormattingUtil.camelToSpaces(labelText);
    this.attr('.label', {
      text: labelText,
      fontSize: 12
    });
  }
}

export default ContentTypeNode;