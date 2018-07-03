import * as joint from 'jointjs';
import * as _ from 'lodash';

export const TriggerSystemPortGroups = {
    'in': {
        position: {
            name: 'left', // layout name
            args: {}, // arguments for port layout function, properties depends on type of layout
        },
        label: {
            position: {
                name: 'left', args: { y: -5 }
            }
        },
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
        label: {
            position: {
                name: 'right', args: { y: 5 }
            }
        },
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
};

// Type property must be UNIQUE
export const UnlockPort = {
    label: 'unlock',
    type: 'unlock',
    group: 'in',
    attrs: { 'text': { text: 'unlock' } }
};

export const AvailableConditionPort = {
    label: 'available',
    type: 'available',
    group: 'in',
    attrs: { 'text': { text: 'make available' } }
};

export const UnlockedPort = {
    label: 'unlocked',
    type: 'unlocked',
    group: 'out',
    attrs: { 'text': { text: 'unlocked' } }
};

export const AvailablePort = {
    label: 'available',
    type: 'available',
    group: 'out',
    attrs: { 'text': { text: 'available' } }
};

export const CompletedPort = {
    label: 'completed',
    type: 'completed',
    group: 'out',
    attrs: { 'text': { text: 'completed' } }
};

export const LogicalInPort = {
    label: 'logical in',
    type: 'logical in',
    group: 'in',
    attrs: { 'text': { text: '' } }
    // validateConnection: (against: SVGElement | joint.dia.CellView) => {
    //     return true;
    // }
};

export const LogicalOutPort = {
    label: 'logical out',
    type: 'logical out',
    group: 'out',
    attrs: { 'text': { text: '' } }
};

export const DelayInPort = {
    label: 'delay in',
    type: 'delay in',
    group: 'in',
    attrs: { 'text': { text: '' } }
};

export const DelayOutPort = {
    label: 'delay out',
    type: 'delay out',
    group: 'out',
    attrs: { 'text': { text: '' } }
};