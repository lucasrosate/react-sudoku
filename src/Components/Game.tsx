
import { useState, useEffect, useRef, useCallback } from 'react';

import Sudoku from '../Sudoku';

import GameStyle from '../styles/GameStyle.module.css';
import GameCell from './GameCell';





var sudo = new Sudoku();
sudo.init();

const Game: React.FC = () => {



    // Solução achada para que o EventListener leia o state selectedNumber atualizado
    var [selectedNumber, _setselectedNumber] = useState<SelectedNumberState>({ row: 0, column: 0 })
    const selectedNumberRef = useRef(selectedNumber);

    const setSelectedNumber = (data: SelectedNumberState) => {
        selectedNumberRef.current = data;
        _setselectedNumber(data);
    }
    // ---------

    // Inicializando o array 2D do tabuleiro (mesma solução abaixo)
    var [arrSudoku, _setArrSudoku] = useState<number[][]>([
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0]]);
    const arrSudokuRef = useRef(arrSudoku);

    const setArrSudoku = (data: number[][]) => {
        arrSudokuRef.current = data;
        _setArrSudoku(data);
    }

    // Função para os números se digitados pelo teclado
    const addEventKeyListener = useCallback(() => {

        document.addEventListener("keydown", (event) => {
            var newArray: Array<number[]> = arrSudokuRef.current;
            let _selectedNumber = selectedNumberRef.current;

            if (event.key.match(/^[0-9]+$/) != null) {
                let _selectedNumber = selectedNumberRef.current;

                const parsedKey = parseInt(event.key);

                if (parsedKey > 0) {
                    if ((newArray[_selectedNumber.row][_selectedNumber.column] !== sudo.arr[_selectedNumber.row][_selectedNumber.column]) || sudo.arr[_selectedNumber.row][_selectedNumber.column] === 0) {
                        newArray[_selectedNumber.row][_selectedNumber.column] = parsedKey;
                        setArrSudoku(newArray);
                        document.getElementById(`c${_selectedNumber.column}l${_selectedNumber.row}`)!.click();
                    }
                }

            }

            switch (event.key) {
                case "Delete":
                    newArray[_selectedNumber.row][_selectedNumber.column] = 0;
                    setArrSudoku(newArray);
                    break;

                case "ArrowUp":
                    console.log(selectedNumberRef.current.row)
                    _selectedNumber.row = _selectedNumber.row === 0 ? 8 : _selectedNumber.row - 1;
                    setSelectedNumber({ row: _selectedNumber.row, column: _selectedNumber.column });
                    break;

                case "ArrowDown":
                    console.log(selectedNumberRef.current.row)
                    _selectedNumber.row = _selectedNumber.row === 8 ? 0 : _selectedNumber.row + 1;
                    setSelectedNumber({ row: _selectedNumber.row, column: _selectedNumber.column });
                    break;

                case "ArrowLeft":
                    console.log(selectedNumberRef.current.column)
                    _selectedNumber.column = _selectedNumber.column === 0 ? 8 : _selectedNumber.column - 1;
                    setSelectedNumber({ row: _selectedNumber.row, column: _selectedNumber.column });
                    break;

                case "ArrowRight":
                    _selectedNumber.column = _selectedNumber.column === 8 ? 0 : _selectedNumber.column + 1;
                    setSelectedNumber({ row: _selectedNumber.row, column: _selectedNumber.column });
                    break;

            }

            document.getElementById(`c${_selectedNumber.column}l${_selectedNumber.row}`)!.click()
        })
    }, [])

    const handleDifficultyChange = useCallback((selectValue: string) => {
        sudo.difficulty = selectValue;
        sudo.init();
        setArrSudoku(JSON.parse(JSON.stringify(sudo.arr)));
    }, [])

    // Função para obter as coordenadas da casa selecionada pelo usuário
    const writeSelectedCoordinates = (e: any, indexRow: number, indexColumn: number) => {

        const pattern: RegExp = /\d/g;

        const coord = e.target.id.match(pattern);

        if (!(arrSudoku[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && arrSudoku[indexRow][indexColumn] !== 0))
            setSelectedNumber({ row: parseInt(coord[1]), column: parseInt(coord[0]) });

    }

    // Setando o tabuleiro para os números iniciais do jogo e adicionando o EventListener após renderizar
    useEffect(() => {
        handleDifficultyChange("medium");
        addEventKeyListener()
    }, [handleDifficultyChange, addEventKeyListener])

    return (
        <div className={GameStyle.containerAll}>
            <div className={GameStyle.gameContainer} id="GameContainer">
                <div className={GameStyle.windowContainer}>
                    <div className={GameStyle.boardContainer}>
                        {
                            // arrSudoku tipo number[][], usando map 2x
                            arrSudoku.map(((subArr: number[], indexRow: number) => {
                                return (
                                    <div key={indexRow}>
                                        {
                                            subArr.map((elem: number, indexColumn: number) =>
                                                <GameCell
                                                    key={indexColumn}
                                                    indexRow={indexRow}
                                                    indexColumn={indexColumn}
                                                    elem={elem}
                                                    arrSudokuRef={arrSudokuRef}
                                                    writeSelectedCoordinates={writeSelectedCoordinates}
                                                    selectedNumber={selectedNumber}
                                                    sudo={sudo}
                                                />)
                                        }

                                    </div>
                                )
                            }))
                        }
                    </div>
                </div>
            </div>

            <div className={GameStyle.selectContainer}>
                <label htmlFor="difficulty">Dificuldade</label>
                <select name="difficulty" id="difficulty" onChange={e => handleDifficultyChange(e.target.value)}>
                    <option value="easy">easy</option>
                    <option value="medium">medium</option>
                    <option value="hard">hard</option>
                </select>
            </div>

        </div>
    )
}

export default Game;