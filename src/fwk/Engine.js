import BackBuffer from './BackBuffer';

export default class Engine extends BackBuffer {
    constructor(config) {
        config = config || {};

        super(window.innerWidth, window.innerHeight);
        document.body.appendChild(this.canvas);

        this.backgroundColor = config.backgroundColor || null;

        window.onresize = () => this.updateSize();
        this.updateSize();

        // this.config = config;
        // this.fps = 0;
        // this.elapsed = 0;
        // this.frames = [];
    }

    updateSize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
    }

    render() {
        let time = +new Date,
            dt = time - this.lastTime;

        this.lastTime = time;

        // this.frames.push(dt);
        // this.elapsed += dt;

        // if (this.elapsed >= 100) {
        //     this.elapsed = 0;
        //     this.fps = 1000 / (this.frames.reduce((t, c) => t + c, 0) / this.frames.length);
        //     this.frames = [];
        // }

        this.clear();
        this.update(dt);
        this.draw();

        requestAnimationFrame(() => this.render());
    }

    async load() { }

    draw() { }

    update() { }

    async start() {
        await this.load();

        this.lastTime = +new Date;
        this.render();
    }

    // get FPS() {
    //     return Math.round(this.fps * 100) / 100;
    // }

    clear() {
        if (this.backgroundColor) {
            this.ctx.fillStyle = this.backgroundColor.toString();
            this.ctx.fillRect(0, 0, this.width, this.height);
        } else
            super.clear();
    }
}