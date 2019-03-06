export default class BackBuffer {
    constructor(width, height, alpha) {
        alpha = alpha || false;

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext("2d", { alpha });
        this.setSize(width, height);
    }

    set width(value) {
        this.canvas.width = value;
    }
    get width() {
        return this.canvas.width;
    }

    set height(value) {
        this.canvas.height = value;
    }
    get height() {
        return this.canvas.height;
    }

    setSize(width, height) {
        this.canvas.width = width;
        this.canvas.height = height;
        return this;
    }

    clear() {
        this.ctx.clearRect(0, 0, this.width, this.height);
    }
}