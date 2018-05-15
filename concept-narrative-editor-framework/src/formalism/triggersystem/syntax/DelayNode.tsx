import * as joint from 'jointjs';
import * as React from 'react';

import TriggerSystemNode from '../TriggerSystemNode';
import { FormEvent } from 'react';

class DelayNode extends TriggerSystemNode {
    private _value: number;

    constructor(attributes?: any, options?: any) {
        super(attributes, options);

        this.set('markup', `<g class="editor-node">
                                <rect class="body" />
                                <text class="label" />
                                <rect class="popover" />
                                <text class="popover-label" />
                            </g>`);
    }

    public set value(value: number) {
        // Clamp
        this._value = value;
        if (this._value < 0)
            this._value = 0;

        this.attr('.popover-label', {
            text: `${value}ms`
        });
    }

    public get value() {
        return this._value;
    }

    public defaults(): Backbone.ObjectHash {
        return joint.util.deepSupplement({
            type: 'custom.DelayNode',
            size: { width: 96, height: 32 },
            attrs: {
                '.body': { width: 96, height: 32 },
                '.label': { 'font-size': 14, 'ref-x': .5, 'ref-y': .5, ref: '.body', 'x-alignment': 'middle', 'y-alignment': 'middle', 'fill': 'rgb(0, 0, 0)' },
                '.popover': { x: 6, y: 28, width: 84, height: 16, rx: 2, ry: 2, 'stroke-width': 2, stroke: 'rgb(223, 105, 26)', fill: 'rgb(235, 235, 235)' },
                '.popover-label': { 'font-size': 10, 'ref-x': .5, 'ref-y': .5, y: 28, ref: '.popover', 'x-alignment': 'middle', 'y-alignment': 'middle', fill: 'rgb(0, 0, 0)' }
            }
        }, joint.shapes.basic.Generic.prototype.defaults);
    }

    public render() {
        return (
            <div>
                <h4>Delay (in ms)</h4>
                <input type="number" onChange={this.onValueChange} value={this.value} />
            </div>
        );
    }

    private onValueChange = (event: FormEvent<HTMLInputElement>) => {
        this.value = parseInt(event.currentTarget.value, 10) || 0;
    }
}

export default DelayNode;