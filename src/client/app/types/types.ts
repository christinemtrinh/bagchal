export interface GameState {
    turn: string;
    board: Array<string>;
}

export interface piece {
    board: Array<string>;
    index: [number, number];
}