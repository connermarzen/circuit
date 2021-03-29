import { remote } from 'electron';
import * as fs from 'fs';
const { dialog } = remote;
import Two from "two.js";

export class Circuit extends Two.Group {
    private label: Two.Text;
    private rect: Two.Rectangle;
    private y_offset: number = 15;
    public grid_spacing: number = 20
    private height: number = 100;

    public dragging: boolean;

    /**
     * @param name the component name
     * @param pins the number of pins the component has
     * @param x the horizontal, initial position of the object
     * @param y the vertical, initial position of the object
     */
    public constructor(name: string, pins: number, x: number, y: number) {
        super();

        this.dragging = false;

        // Rectangle
        this.rect = new Two.Rectangle(x, y, 200, 100);
        this.rect.fill = '#fff';
        this.rect.linewidth = 2.0;
        this.rect.stroke = '#000';

        // Label
        this.label = new Two.Text(name,
            x - (x % this.grid_spacing),
            y - (y % this.grid_spacing) - (this.height / 2) + this.y_offset);
        this.label.family = 'helvetica';
        this.label.weight = 'bold';
        this.label.size = 14;
        this.add(this.rect, this.label);
    }

    /**
     * Convenience/Wrapper function which moves the group to the given location.
     * @param x The X vector component to move the object to.
     * @param y The Y vector component to move the object to.
     */
    public move(x: number, y: number): void {
        var x_1 = x - (x % this.grid_spacing);
        var y_1 = y - (y % this.grid_spacing);
        this.rect.translation.set(x_1, y_1);
        this.label.translation.set(x_1, y_1 - (this.height / 2) + this.y_offset);
    }

    public makeDraggable(): void {
        if (this._renderer.elem !== undefined) {
            this._renderer.elem.addEventListener('mouseup', (event: MouseEvent) => {
                this.onEndDrag(event)
            });
            this._renderer.elem.addEventListener('mousedown', (event: MouseEvent) => {
                this.onStartDrag(event)
            });
            this._renderer.elem.addEventListener('mousemove', (event: MouseEvent) => {
                this.onDrag(event)
            });
        }
    }

    public getFile(): void {
        let blob = new Blob([this._renderer.elem], { type: 'image/svg+xml;charset=utf-8' });
        console.log(this._renderer.elem.ownerSVGElement);
        var ser = new XMLSerializer();
        var path = dialog.showSaveDialogSync(null, {});
        fs.writeFileSync(path, ser.serializeToString(this._renderer.elem.ownerSVGElement););
    }

    private onStartDrag(event: MouseEvent): void {
        console.log("starting drag");
        this.dragging = true;
    }

    private onEndDrag(event: MouseEvent): void {
        this.dragging = false;
    }

    private onDrag(event: MouseEvent): void {
        if (this.dragging) {
            this.move(event.x, event.y);
        }
    }
}