import * as joint from 'jointjs';

import Node from '../base/Node';

class TriggerSystemNode extends Node {
    constructor(attributes?: joint.dia.Element.Attributes, options?: any) {
        super(attributes, options);

        this.prop('ports', {
            groups: {
                'in': {
                    position: {
                        name: 'left', // layout name
                        args: {}, // arguments for port layout function, properties depends on type of layout
                    },
                    label: {},
                    attrs: {
                        '.port-body': {
                            magnet: true
                        }
                    },
                    markup: '<circle class="port-body" r="10" />' // r = radius of the circle
                },
                'out': {
                    position: {
                        name: 'right', // layout name
                        args: {}, // arguments for port layout function, properties depends on type of layout
                    },
                    label: {},
                    attrs: {
                        '.port-body': {
                            magnet: true
                        }
                    },
                    markup: '<circle class="port-body" r="10" />' // r = radius of the circle
                }
            }
        });
    }
}

export default TriggerSystemNode;