import * as joint from 'jointjs';

interface CustomPortGroup extends joint.dia.Element.Port {
    validateConnection(otherPort: SVGElement): boolean;
}

export default CustomPortGroup;