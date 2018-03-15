import * as joint from 'jointjs';

interface NodeEditorCanvasProperties {
    container: HTMLElement;
    model: joint.dia.Graph;
}

class NodeEditorCanvas {
    private _paper: joint.dia.Paper;

    constructor(props: NodeEditorCanvasProperties) {
        const defaultLink = new joint.dia.Link({
            connector: { name: 'rounded' }
        });

        this._paper = new joint.dia.Paper({
            el: props.container,
            model: props.model,
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
        this.getPaper().setDimensions(window.innerWidth, window.innerHeight);
    }
}
  
export default NodeEditorCanvas;