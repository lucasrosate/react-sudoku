interface ISelectedNumber {
    row: number,
    column: number
}

type ISudoku = {
    arr: number [][],
    initialNumbersCount: number,
    difficulty: string,
    possible(arr: number[][], row: number, column: number, n: number, isTest: boolean): boolean
}


type GameCell = {
    indexRow: number,
    indexColumn: number,
    elem: number
    arrSudokuRef: RefObject<number[][]>,
    writeSelectedCoordinates: Function,
    selectedNumber: ISelectedNumber
    sudo: ISudoku
}
