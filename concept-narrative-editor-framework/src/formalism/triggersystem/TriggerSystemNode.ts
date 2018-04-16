import * as joint from 'jointjs';
import * as _ from 'lodash';

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
                    markup: '<circle class="port-body" r="10" />', // r = radius of the circle,
                    validateConnection: (otherPort: SVGElement): boolean => {
                        const allowConnectionsTo = ['out'];
                        const otherPortGroup = otherPort.getAttribute('port-group');

                        return _.includes(allowConnectionsTo, otherPortGroup);
                    }
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
                    markup: '<circle class="port-body" r="10" />', // r = radius of the circle
                    validateConnection: (otherPort: SVGElement): boolean => {
                        const allowConnectionsTo = ['in'];
                        const otherPortGroup = otherPort.getAttribute('port-group');

                        return _.includes(allowConnectionsTo, otherPortGroup);
                    }
                }
            }
        });
    }
}

export default TriggerSystemNode;