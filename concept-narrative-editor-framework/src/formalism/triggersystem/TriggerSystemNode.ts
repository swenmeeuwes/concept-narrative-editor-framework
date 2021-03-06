import * as joint from 'jointjs';
import * as _ from 'lodash';

import Node from '../base/Node';

class TriggerSystemNode extends Node {
    constructor(attributes?: joint.dia.Element.Attributes, options?: any) {
        super(attributes, options);

        this.set('markup', `<g class="content-type-node">
                                <rect class="body" />
                                <text class="label" />
                            </g>`);

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
                    validateConnection: (other: SVGElement | joint.dia.CellView): boolean => {
                        const allowConnectionsTo = ['out'];
                        if (other instanceof SVGElement) {
                            const otherPortGroup = other.getAttribute('port-group');
                            return _.includes(allowConnectionsTo, otherPortGroup);
                        }

                        if (other instanceof joint.dia.CellView) {
                            return true;
                        }

                        return false;
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
                    validateConnection: (other: SVGElement | joint.dia.CellView): boolean => {
                        const allowConnectionsTo = ['in'];
                        if (other instanceof SVGElement) {
                            const otherPortGroup = other.getAttribute('port-group');
                            return _.includes(allowConnectionsTo, otherPortGroup);
                        }

                        if (other instanceof joint.dia.CellView) {
                            return true;
                        }

                        return false;
                    }
                }
            }
        });
    }

    public defaults(): Backbone.ObjectHash {
        return joint.util.deepSupplement({
            type: 'custom.TriggerSystemNode',
            size: { width: 96, height: 96 },
            attrs: {
                'rect': { width: 96, height: 96 },
                'text': { 'font-size': 14, 'ref-x': .5, 'ref-y': .15, ref: 'rect', 'y-alignment': 'middle', 'x-alignment': 'middle', 'fill': 'rgb(0, 0, 0)' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults);
    }
}

export default TriggerSystemNode;