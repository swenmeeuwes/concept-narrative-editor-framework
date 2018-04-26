import * as joint from 'jointjs';

interface CustomPort extends joint.dia.Element.Port {
    type?: string;
    validateConnection?: (against: SVGElement | joint.dia.CellView) => boolean;
}

export default CustomPort;