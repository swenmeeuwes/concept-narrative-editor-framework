import * as joint from 'jointjs';

interface CustomPort extends joint.dia.Element.Port {
    type?: string;
}

export default CustomPort;