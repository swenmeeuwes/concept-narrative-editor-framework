import * as joint from 'jointjs';
import * as _ from 'lodash';

export const TriggerSystemPortGroups = {
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
};

// Type property must be UNIQUE
export const UnlockPort = {
    label: 'unlock',
    type: 'unlock',
    group: 'in'
};

export const AvailableConditionPort = {
    label: 'available',
    type: 'available',
    group: 'in'
};

export const UnlockedPort = {
    label: 'unlocked',
    type: 'unlocked',
    group: 'out'
};

export const AvailablePort = {
    label: 'available',
    type: 'available',
    group: 'out'
};

export const CompletedPort = {
    label: 'completed',
    type: 'completed',
    group: 'out'
};

export const LogicalInPort = {
    label: 'logical in',
    type: 'logical in',
    group: 'in',
    validateConnection: (against: SVGElement | joint.dia.CellView) => {
        return true;
    }
};

export const LogicalOutPort = {
    label: 'logical out',
    type: 'logical out',
    group: 'out'
};

export const DelayInPort = {
    label: 'delay in',
    type: 'delay in',
    group: 'in'
};

export const DelayOutPort = {
    label: 'delay out',
    type: 'delay out',
    group: 'out'
};