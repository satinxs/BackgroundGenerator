import Engine from './fwk/Engine';
import Color from './fwk/Color';
import { ready } from './fwk/utilities';

class Viewer extends Engine {
    constructor() {
        super({ backgroundColor: new Color(50, 50, 80) });

        this.density = "";

    }

    draw() {

    }
}

ready(() => {
    window.view = new Viewer();
    window.view.start();
});