import * as joint from 'jointjs';

interface NodeEditorCanvasProperties {
    parentContainter: HTMLElement;
    container: HTMLElement;
    model: joint.dia.Graph;
}

class NodeEditorCanvas {
    private _paper: joint.dia.Paper;
    private _props: NodeEditorCanvasProperties;

    constructor(props: NodeEditorCanvasProperties) {
        this._props = props;

        const defaultLink = new joint.dia.Link({
            connector: { name: 'rounded' }
        });

        this._paper = new joint.dia.Paper({
            el: props.container,
            model: props.model,
            width: props.container.offsetWidth,
            height: props.container.offsetHeight,
            gridSize: 1,
            snapLinks: true,
            linkPinning: false,
            defaultLink: defaultLink,
            defaultRouter: { name: 'manhattan' },
            validateConnection: this.validateConnection
        });

        this.onWindowResize(); // Set initial size

        this.addEventListeners();
    }

    getPaper() {
        return this._paper;
    }

    private addEventListeners() {
        window.addEventListener('resize', this.onWindowResize.bind(this));
    }

    private validateConnection(sourceView: joint.dia.CellView, sourceMagnet: SVGElement, 
                                targetView: joint.dia.CellView, targetMagnet: SVGElement) {
        return sourceView !== targetView && sourceMagnet !== targetMagnet
                && sourceMagnet.getAttribute('port') !== targetMagnet.getAttribute('port');
    }

    private onWindowResize() {
        const container = document.getElementById(this._props.parentContainter.id);
        if (container !== null) {
            this.getPaper().setDimensions(container.offsetWidth, container.offsetHeight);
        }
    }
}
  
export default NodeEditorCanvas;