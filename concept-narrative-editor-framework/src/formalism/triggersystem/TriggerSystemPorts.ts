// Type property must be UNIQUE

const UnlockPort = {
    label: 'unlock',
    type: 'unlock',
    group: 'in'
};

const AvailableConditionPort = {
    label: 'available',
    type: 'available',
    group: 'in'
};

const UnlockedPort = {
    label: 'unlocked',
    type: 'unlocked',
    group: 'out'
};

const AvailablePort = {
    label: 'available',
    type: 'available',
    group: 'out'
};

const CompletedPort = {
    label: 'completed',
    type: 'completed',
    group: 'out'
};

const LogicalInPort = {
    label: 'logical in',
    type: 'logical in',
    group: 'in',
    validateConnection: (against: SVGElement | joint.dia.CellView) => {
        return true;
    }
};

const LogicalOutPort = {
    label: 'logical out',
    type: 'logical out',
    group: 'out'
};

const DelayInPort = {
    label: 'delay in',
    type: 'delay in',
    group: 'in'
};

const DelayOutPort = {
    label: 'delay out',
    type: 'delay out',
    group: 'out'
};

export { 
    UnlockPort, 
    AvailableConditionPort, 
    UnlockedPort, 
    AvailablePort, 
    CompletedPort,
    LogicalInPort,
    LogicalOutPort,
    DelayInPort,
    DelayOutPort
};