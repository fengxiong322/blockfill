export const BLOCK_TYPE = {
    block: "block",
    empty: "empty",
    filled: "filled"
};

export const STAGE = {
    TIMED: {
        intro: 0,
        overlay: 1,
        start: 2,
        end: 3,
        repeat: 4,
        length: 5
    }
};

export const DIRECTION = {
    UP: [1, 0],
    LEFT: [0, -1],
    DOWN: [-1, 0],
    RIGHT: [0, 1],
    NONE: [0, 0]
}
