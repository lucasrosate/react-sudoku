
import { useState, useEffect, useRef } from 'react';

import Sudoku from '../Sudoku';

import GameStyle from '../styles/GameStyle.module.css';
import { CSSProperties } from 'styled-components';


interface ISelectedNumber {
    row: number,
    column: number
}


var sudo = new Sudoku;
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

    var [statusArray, setStatusArray] = useState<number>(0);

    // Função para obter as coordenadas da casa selecionada pelo usuário
    const writeSelectedCoordinates = (e: any, indexRow: number, indexColumn: number) => {

        const pattern: RegExp = /\d/g;

        const coord = e.target.id.match(pattern);

        if (!(arrSudoku[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && arrSudoku[indexRow][indexColumn] !== 0))
            setSelectedNumber({ row: parseInt(coord[1]), column: parseInt(coord[0]) });

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
                                    <div>

                                        {
                                            subArr.map((elem: number, indexColumn: number) => {

                                                // Renderizar as linhas mais destacadas de cada matriz 3x3
                                                const isRowDiv: number = (indexRow + 1) % 3;
                                                const isColumnDiv: number = (indexColumn + 1) % 3;

                                                const isEmpty: boolean = arrSudoku[indexRow][indexColumn] === 0;
                                                const isSelected: boolean = indexColumn === selectedNumber.column && indexRow === selectedNumber.row;
                                                const isNonEditable: boolean = arrSudokuRef.current[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && sudo.arr[indexRow][indexColumn] !== 0;
                                                const isPossible: boolean = isNonEditable || isEmpty ? false: sudo.possible(arrSudokuRef.current, indexRow, indexColumn, elem, true);


                                                
                                                const spanStyle: CSSProperties = {
                                                    backgroundColor: isSelected ? "rgb(230,230,230)" : "white",
                                                    color: isNonEditable ? "#3d8abd" : isEmpty && isSelected ? "rgb(230,230,230)" :  isPossible ? "#3dbd7d" : isEmpty ? "white" : "#f34c4c",
                                                    fontWeight: isNonEditable ? 600 : 400
                                                }

                                                // Criar elemento react do tipo <span> e estilizar para quando selecionar e destacar quais são os inicias que não podem ser modificados
                                                return (
                                                    <div className={
                                                        (isRowDiv === 0 && isColumnDiv === 0) ? `${GameStyle.normalSpan} ${GameStyle.borderRightDown}`
                                                            : (isRowDiv !== 0 && isColumnDiv === 0) ? `${GameStyle.borderRight}`
                                                                : (isRowDiv === 0 && isColumnDiv !== 0) ? `${GameStyle.borderDown}` : `${GameStyle.innerBorder}`
                                                    }
                                                        key={`c${indexColumn}l${indexRow}`}

                                                    >
                                                        <span id={`c${indexColumn}l${indexRow}`}
                                                            className="normal-span"
                                                            onClick={e => writeSelectedCoordinates(e, indexRow, indexColumn)}
                                                            style={spanStyle}
                                                        >
                                                            {elem}
                                                        </span>
                                                    </div>
                                                )
                                            })}
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