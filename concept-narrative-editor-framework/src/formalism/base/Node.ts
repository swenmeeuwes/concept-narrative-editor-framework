import * as joint from 'jointjs';

import EmptyConstructor from './EmptyConstructor';

import '../../model/ContentTypeNode.css';

abstract class Node extends joint.shapes.devs.Model {
    constructor(attributes: any = {}, options: any = {}) {
        super(attributes, options);

        this.set('markup', `<g class="content-type-node">
                                <defs>
                                    <clipPath id="textClip">
                                    <rect x="-42" width="84" height="35" />
                                    </clipPath>
                                </defs>
                    
                                <rect class="body" />
                                <text class="label" clip-path="url(#textClip)" />
                            </g>`);

        // this.changeInGroup({
        //     position: {
        //         name: 'top'
        //     }
        // });

        // this.set('markup', `<rect class="body" /><text class="label" />`);

        // this.set('markup', `<g class="rotatable">
        //                         <g class="scalable">
        //                             <rect class="body" />
        //                             <text class="label" />
        //                         </g>
        //                     </g>`);

        // this.set('attrs',  {
        //     'rect': { width: 96, height: 96, strokeWidth: 4, stroke: 'rgb(223, 105, 26)', fill: 'rgb(235, 235, 235)', 'rx': 5, 'ry': 5 },
        //     'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle' }
        // });
    }

    public cloneDeep(typeConstructor: EmptyConstructor<this>): this {
        const cloned = JSON.parse(JSON.stringify(this));
        const clone = new typeConstructor();

        for (const field of Object.keys(cloned)) {
            clone[field] = cloned[field];
        }

        console.log(clone);

        return clone;
    }
}

export default Node;

// Look into this:
// class Node extends joint.shapes.basic.Generic {
//     constructor(attributes?: any, options?: any) {
//         super(attributes, options);
//         this.set('markup', '<rect /><text />');
//         this.attr('.label', 'node');
//         this.set('markup', `<g class="rotatable">
//                                 <g class="scalable">
//                                     <rect class="body" />
//                                     <text class="label" />
//                                 </g>
//                             </g>`);
//     }

//     public defaults(): Backbone.ObjectHash {
//         return joint.util.deepSupplement({
//             type: 'custom.Node',
//             attrs: {
//                 'rect': { width: 96, height: 96, strokeWidth: 4, stroke: 'rgb(223, 105, 26)', fill: 'rgb(235, 235, 235)', 'rx': 5, 'ry': 5 },
//                 'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle' }
//             }
//         }, joint.shapes.basic.Generic.prototype.defaults);
//     }
// }

// export default Node;