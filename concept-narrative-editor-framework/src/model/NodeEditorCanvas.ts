import * as joint from 'jointjs';
import * as SvgPanZoom from 'svg-pan-zoom';
import ContentTypeNode from '../model/ContentTypeNode';

// Functions definitions
type OnNodeSelected = (cellView: joint.dia.CellView | null) => void;

interface NodeEditorCanvasProperties {
    parentContainer: HTMLElement;
    container: HTMLElement;
    model: joint.dia.Graph;
    onNodeSelected: OnNodeSelected;
}

class NodeEditorCanvas {
    private _paper: joint.dia.Paper;
    private _props: NodeEditorCanvasProperties;
    private _panZoomInstance: SvgPanZoom.Instance;

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
            gridSize: 16,
            drawGrid: true,
            snapLinks: true,
            linkPinning: false,
            defaultLink: defaultLink,
            defaultRouter: { name: 'manhattan' },
            validateConnection: this.validateConnection
        });

        this._panZoomInstance = SvgPanZoom(`#${props.container.id} svg`, {
            center: false,
            zoomEnabled: true,
            panEnabled: true,
            fit: false,
            minZoom: 0.8,
            maxZoom: 1.2,
            zoomScaleSensitivity: 0.1
        });

        this.onWindowResize(); // Set initial size

        this.addEventListeners();
    }

    public get Paper() {
        return this._paper;
    }

    private addEventListeners() {
        window.addEventListener('resize', this.onWindowResize);
        this._paper.on('cell:pointerdown', this.onPointerDown);
        this._paper.on('cell:pointerup', this.onPointerUp);
        this._paper.on('cell:pointerclick', this.onNodeSelected);
        this._paper.on('blank:pointerdown', this.onBlankPointerDown);
    }

    private onWindowResize = () => {
        const container = document.getElementById(this._props.parentContainer.id);
        if (container !== null) {
            this.Paper.setDimensions(container.offsetWidth, container.offsetHeight);
        }
    }

    private onNodeSelected = (cellView: joint.dia.CellView) => {
        if (cellView.model instanceof ContentTypeNode)
            this._props.onNodeSelected(cellView);
        else
            this._props.onNodeSelected(null);

        this._panZoomInstance.disablePan();
    }

    private onPointerDown = () => {
        this._panZoomInstance.disablePan();
    }

    private onPointerUp = () => {
        this._panZoomInstance.enablePan();
    }

    private onBlankPointerDown = (evt: EventTarget, x: number, y: number) => {
        this._props.onNodeSelected(null);
    }

    private validateConnection(sourceView: joint.dia.CellView, sourceMagnet: SVGElement,
        targetView: joint.dia.CellView, targetMagnet: SVGElement) {
        return sourceView !== targetView && sourceMagnet !== targetMagnet
            && sourceMagnet.getAttribute('port') !== targetMagnet.getAttribute('port');
    }
}

export default NodeEditorCanvas;