export interface GameState {
    turn: string;
    board: Array<string>;
}

export interface piece {
    board: Array<string>;
    index: [number, number];
}

export interface movePiece {
    board: Array<string>;
    initialIndex: [number, number];
    finalIndex: [number, number]

}

export interface captureGoat {
    board: Array<string>;
    initialIndex: [number, number];
    finalIndex: [number, number]
    goatCapturedIndex: [number, number]

}