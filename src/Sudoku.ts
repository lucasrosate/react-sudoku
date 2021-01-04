//  fácil=30 médio=25 difícil = 23

class Sudoku {
    arr = [
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]
    ]

    // solution: Array<number[]>;

    initialNumbersCount: number;


    constructor(difficulty: string) {
        switch (difficulty) {
            case "easy":
                this.initialNumbersCount = 23;
                break;

            case "medium":
                this.initialNumbersCount = 25;
                break;

            case "hard":
                this.initialNumbersCount = 30;
                break;

            default:
                this.initialNumbersCount = 25;
                break;
        }
    }


    async init() {
        this._getInitialNumbers();
    }


    solution() {
        let solutionArr = this.arr;

        for (let i = 0; i < 9; i++)
            for (let j = 0; j < 9; j++) {
                if (solutionArr[i][j] == 0) {
                    for (let k = 1; k <= 9; k++) {
                        if (this._possible(i, j, k)) {
                            solutionArr[i][j] = k;
                            this.solution()
                            solutionArr[i][j] = 0;
                        }
                    }
                    return
                }
            }
        return solutionArr;
    }


    private async _getInitialNumbers() {

        var countFillNumbers = 0;
        let isValid;
        let randAddress1: number, randAddress2: number, randNum: number;

        while (countFillNumbers < this.initialNumbersCount) {
            randAddress1 = Math.floor(Math.random() * 9);
            randAddress2 = Math.floor(Math.random() * 9);
            randNum = Math.floor(Math.random() * 9);

            if (this.arr[randAddress1][randAddress2] === 0) {
                isValid = this._possible(randAddress1, randAddress2, randNum);

                if (isValid) {
                    this.arr[randAddress1][randAddress2] = randNum;
                    countFillNumbers += 1;
                }
            }
        }
    }

    private _possible(line: number, column: number, n: number) {
        for (let i = 0; i < 9; i++)
            if (this.arr[line][i] === n) return false;


        for (let i = 0; i < 9; i++)
            if (this.arr[i][column] === n) return false;


        const minIndexRow = line > 5 ? 6 : line > 2 ? 3 : 0;
        const maxIndexRow = line > 5 ? 8 : line > 2 ? 5 : 2;

        const minIndexColumn = column > 5 ? 6 : column > 2 ? 3 : 0;
        const maxIndexColumn = column > 5 ? 8 : column > 2 ? 5 : 2;

        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if ((i >= minIndexRow && i <= maxIndexRow) && (j >= minIndexColumn && j <= maxIndexColumn) && this.arr[i][j] === n) return false;
            }
        }

        return true;
    }
}

export default Sudoku;