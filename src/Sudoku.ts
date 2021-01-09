//  fácil=30 médio=25 difícil = 23

class Sudoku implements SudokuClassInterface {
    arr: number[][] = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
    ];


    initialNumbersCount: number = 25;
    difficulty: string = "médio";


    async init() {

        switch (this.difficulty) {
            case "fácil":
                this.initialNumbersCount = 23;
                break;

            case "médio":
                this.initialNumbersCount = 25;
                break;

            case "difícil":
                this.initialNumbersCount = 30;
                break;

            default:
                this.initialNumbersCount = 25;
                break;
        }

        this._getInitialNumbers();
    }


    private async _getInitialNumbers() {
        this._reset();

        var countFillNumbers = 0;
        let isValid;
        let randAddress1: number, randAddress2: number, randNum: number;

        while (countFillNumbers < this.initialNumbersCount) {
            randAddress1 = Math.floor(Math.random() * 9);
            randAddress2 = Math.floor(Math.random() * 9);
            randNum = Math.floor(Math.random() * 9);

            if (this.arr[randAddress1][randAddress2] === 0) {
                isValid = this.possible(this.arr, randAddress1, randAddress2, randNum, false);

                if (isValid) {
                    this.arr[randAddress1][randAddress2] = randNum;
                    countFillNumbers += 1;
                }
            }
        }
    }

    possible(arr: number[][], row: number, column: number, n: number, isTest: boolean) {

        for (let i = 0; i < 9; i++)
            if (isTest) {
                if (i !== column)
                    if (arr[row][i] === n) return false;
            } else {
                if (arr[row][i] === n) return false;
            }



        for (let i = 0; i < 9; i++)
            if (isTest) {
                if (i !== row)
                    if (arr[i][column] === n) return false;
            } else {
                if (arr[i][column] === n) return false;
            }



        const minIndexRow = row > 5 ? 6 : row > 2 ? 3 : 0;
        const maxIndexRow = row > 5 ? 8 : row > 2 ? 5 : 2;

        const minIndexColumn = column > 5 ? 6 : column > 2 ? 3 : 0;
        const maxIndexColumn = column > 5 ? 8 : column > 2 ? 5 : 2;

        for (let i = minIndexRow; i <= maxIndexRow; i++) {
            for (let j = minIndexColumn; j <= maxIndexColumn; j++) {
                if (isTest) {
                    if (i !== row && j !== column)
                        if (arr[i][j] === n) return false;
                } else
                    if (arr[i][j] === n) return false;
            }
        }

        return true;
    }

    private _reset() {
        this.arr = [
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0],
        ]
    }
}

export default Sudoku;