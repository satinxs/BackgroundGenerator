export default class Color {
    constructor(r, g, b, a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
    }

    // sum(color, ignoreAlpha) {
    //     return new Color(this.r + color.r, this.g + color.g, this.b + color.b, ignoreAlpha ? this.a : this.a + color.a);
    // }

    // multiply(factor, ignoreAlpha) {
    //     return new Color(this.r * factor, this.g * factor, this.b * factor, ignoreAlpha ? this.a : this.a * factor);
    // }

    static get Black() {
        return new Color();
    }

    static get White() {
        return new Color(255, 255, 255);
    }

    static get Red() {
        return new Color(255);
    }

    static get Green() {
        return new Color(0, 255);
    }

    static get Blue() {
        return new Color(0, 0, 255);
    }

    toString() {
        return `rgba(${this.r},${this.g},${this.b},${this.a})`;
    }
}