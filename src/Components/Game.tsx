
import { useState, useEffect, useRef } from 'react';

import Sudoku from '../Sudoku';

import GameStyle from '../styles/GameStyle.module.css';
import GameCell from './GameCell';





var sudo = new Sudoku();
sudo.init();

const Game: React.FC = () => {

    // array que o State usa como referência
    var tempArray;

    // Solução achada para que o EventListener leia o state selectedNumber atualizado
    var [selectedNumber, _setselectedNumber] = useState<ISelectedNumber>({ row: 0, column: 0 })
    const selectedNumberRef = useRef(selectedNumber);

    const setSelectedNumber = (data: ISelectedNumber) => {
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
    const addEventKeyListener = () => {

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

            if (event.key === "Delete") {
                newArray[_selectedNumber.row][_selectedNumber.column] = 0;
                setArrSudoku(newArray);
                document.getElementById(`c${_selectedNumber.column}l${_selectedNumber.row}`)!.click()
            }
        })
    }

    const handleDifficultyChange = (selectValue: string) => {
        sudo.difficulty = selectValue;
        sudo.init();
        tempArray = JSON.parse(JSON.stringify(sudo.arr));
        setArrSudoku(tempArray);;
    }

    // Função para obter as coordenadas da casa selecionada pelo usuário
    const writeSelectedCoordinates = (e: any, indexRow: number, indexColumn: number) => {

        const pattern: RegExp = /\d/g;

        const coord = e.target.id.match(pattern);

        if (!(arrSudoku[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && arrSudoku[indexRow][indexColumn] !== 0))
            setSelectedNumber({ row: parseInt(coord[1]), column: parseInt(coord[0]) });

    }

    // Setando o tabuleiro para os números iniciais do jogo e adicionando o EventListener após renderizar
    useEffect(() => {
        async function intializeGame() {
            tempArray = JSON.parse(JSON.stringify(sudo.arr));
            setArrSudoku(tempArray);
            addEventKeyListener();
        }

        intializeGame();
    }, [])

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