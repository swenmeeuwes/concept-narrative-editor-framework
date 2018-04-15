import * as joint from 'jointjs';

class Port implements joint.dia.Element.Port {
    constructor(attributes: joint.dia.Element.Port) {
        const keys = Object.keys(attributes);
        keys.forEach(key => {
            this[key] = attributes[key];
        });
    }
}

export default Port;