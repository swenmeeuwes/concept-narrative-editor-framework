import * as joint from 'jointjs';
import * as SvgPanZoom from 'svg-pan-zoom';
import Node from './formalism/base/Node';
import CustomPortGroup from './formalism/base/CustomPortGroup';
import CustomPort from './formalism/base/CustomPort';
import ApplicationMenu from './menu/ApplicationMenu';

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
            validateConnection: this.validateConnection.bind(this),
            validateEmbedding: this.validateEmbedding.bind(this),
            markAvailable: true,
            embeddingMode: true // Allow cells to embed when dragged over each other
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
        if (cellView.model instanceof Node)
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

    private onBlankPointerDown = (eventTarget: any, x: number, y: number) => {
        this._props.onNodeSelected(null);
        if (eventTarget.button && eventTarget.button === 2) // 2 = right mouse button
            this.handleRightClick();
    }

    private handleRightClick() {
        ApplicationMenu.instance.popupInsertMenu();
    }

    private validateConnection(sourceView: joint.dia.CellView, sourceMagnet: SVGElement,
        targetView: joint.dia.CellView, targetMagnet: SVGElement) {

        // Check for lower level validation methods (will overwrite group level)
        var portId = sourceMagnet.getAttribute('port');
        if (sourceView.model.isElement() && (sourceView.model instanceof joint.dia.Element) && portId != null) {
            var sourceElement = sourceView.model as joint.dia.Element;
            const sourcePort = sourceElement.getPort(portId) as CustomPort;
            if (sourcePort.validateConnection != null)
                return sourcePort.validateConnection(targetMagnet == null ? targetView : targetMagnet);
        }

        const portGroupsDictionary = sourceView.model.attributes.ports.groups as { [key: string]: CustomPortGroup };
        const portGroups = Object.keys(portGroupsDictionary);
        const sourceMagnetGroup = sourceMagnet.getAttribute('port-group');

        if (!targetMagnet) { // Allow connecting to cells instead of magnets
            if (!sourceMagnetGroup || portGroups.indexOf(sourceMagnetGroup) === -1)
                return false;

            return (
                sourceView !== targetView && // disallow loops
                portGroupsDictionary[sourceMagnetGroup].validateConnection(targetView)
            );
        }

        // Check if both magnets have a port group assigned
        const targetMagnetGroup = targetMagnet.getAttribute('port-group');
        if (!sourceMagnetGroup || !targetMagnetGroup)
            return false;

        // Check if both port groups exist
        if (portGroups.indexOf(sourceMagnetGroup) === -1 || portGroups.indexOf(targetMagnetGroup) === -1)
            return false;

        return (
            // cannot connect to same view
            sourceView !== targetView &&

            // cannot connect to same port
            sourceMagnet !== targetMagnet &&
            sourceMagnet.getAttribute('port') !== targetMagnet.getAttribute('port') &&

            // evaluate group constraints
            portGroupsDictionary[sourceMagnetGroup].validateConnection(targetMagnet)
        );
    }

    private validateEmbedding(childView: joint.dia.ElementView, parentView: joint.dia.ElementView) {
        const child = childView.model;
        const parent = parentView.model;
        if (!(child instanceof Node) || !(parent instanceof Node))
            return false;

        return parent.validateEmbed(child);
    }
}

export default NodeEditorCanvas;