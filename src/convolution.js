export const Filters = {
    boxBlur: [
        [0.11, 0.11, 0.11],
        [0.11, 0.11, 0.11],
        [0.11, 0.11, 0.11]
    ],
    gaussian: [
        [1 / 16, 2 / 16, 1 / 16],
        [2 / 16, 4 / 16, 2 / 16],
        [1 / 16, 2 / 16, 1 / 16]
    ],
    edgeDetection: [
        [-1, -1, -1],
        [-1, 8, -1],
        [-1, -1, -1]
    ]
}

export function convoluteBy3(src, kernel) {
    let dst = [];

    for (let x = 0; x < src.length; x++) {
        dst[x] = [];
        for (let y = 0; y < src[x].length; y++) {
            let accumulator = 0;

            for (let i = -1; i < 2; i++) {
                for (let j = -1; j < 2; j++) {
                    let v = (src[x + i] || [])[y + j];
                    accumulator += (v || 0.5) * kernel[i + 1][j + 1];
                }
            }

            dst[x][y] = accumulator;
        }
    }

    return dst;
}