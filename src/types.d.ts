interface SelectedNumberState {
    row: number,
    column: number
}

type SudokuClassInterface = {
    arr: number [][],
    initialNumbersCount: number,
    difficulty: string,
    possible(arr: number[][], row: number, column: number, n: number, isTest: boolean): boolean
}


