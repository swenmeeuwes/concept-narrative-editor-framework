import * as joint from 'jointjs';

interface CustomPortGroup extends joint.dia.Element.Port {
    validateConnection(against: SVGElement | joint.dia.CellView): boolean;
}

export default CustomPortGroup;