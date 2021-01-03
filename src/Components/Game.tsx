
import { useState, useEffect, useRef, createElement } from 'react';

import Sudoku from '../Sudoku';

import GameStyle from '../styles/GameStyle.module.css';
import { CSSProperties } from 'styled-components';


interface ISelectedNumber {
    row: number,
    column: number
}

const Game: React.FC = () => {
    const sudo = new Sudoku("hard");

    // Inicializando o array 2D do tabuleiro
    var [arrSudoku, setArrSudoku] = useState<Array<number[]>>(sudo.arr);

    // Solução achada para que o EventListener leia o state selectedNumber atualizado
    var [selectedNumber, _setselectedNumber] = useState<ISelectedNumber>({ row: 0, column: 0 })
    const selectedNumberRef = useRef(selectedNumber);

    const setSelectedNumber = (data: ISelectedNumber) => {
        selectedNumberRef.current = data;
        _setselectedNumber(data);
    }
    // ---------



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
            let _selectedNumber = selectedNumberRef.current;

            if (event.key.match(/^[0-9]+$/) != null) {
                let _selectedNumber = selectedNumberRef.current;

                console.log(_selectedNumber)

                const parsedKey = parseInt(event.key);

                if (parsedKey > 0) {
                    console.log(arrSudoku);
                    var newArray: Array<number[]> = arrSudoku;
                    newArray[_selectedNumber.row][_selectedNumber.column] = parsedKey;
                    setArrSudoku(newArray);
                    document.getElementById(`c${_selectedNumber.column}l${_selectedNumber.row}`)!.click()


                }
            }

            if(event.key === "Delete") {
                var newArray: Array<number[]> = arrSudoku;
                newArray[_selectedNumber.row][_selectedNumber.column] = 0;
                setArrSudoku(newArray);
                document.getElementById(`c${_selectedNumber.column}l${_selectedNumber.row}`)!.click()
            }
        })
    }

    // Setando o tabuleiro para os números iniciais do jogo e adicionando o EventListener após renderizar
    useEffect(() => {
        addEventKeyListener();
    }, [])

    return (
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

                                            let innerElem = elem;
                                            const isEmpty: boolean = arrSudoku[indexRow][indexColumn] === 0;
                                            const isSelected: boolean = indexColumn === selectedNumber.column && indexRow === selectedNumber.row;
                                            const isNonEditable: boolean = arrSudoku[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && arrSudoku[indexRow][indexColumn] !== 0;


                                            const spanStyle: CSSProperties = {
                                                backgroundColor: isSelected ? "rgb(230,230,230)" : "white",
                                                color:  isEmpty && isSelected ? "rgb(230,230,230)" : isEmpty ? "white" : "rgb(53, 53, 53)",
                                                fontWeight: isNonEditable ? 600 : 400
                                            }

                                            // Criar elemento react do tipo <span> e estilizar para quando selecionar e destacar quais são os inicias que não podem ser modificados
                                            return (
                                                <div className={
                                                     (isRowDiv === 0 && isColumnDiv === 0)? `${GameStyle.normalSPan} ${GameStyle.borderRightDown}`
                                                    :(isRowDiv !== 0 && isColumnDiv === 0) ? `${GameStyle.borderRight}`
                                                    :(isRowDiv === 0 && isColumnDiv !== 0) ? `${GameStyle.borderDown}`:`${GameStyle.innerBorder}`
                                                }
                                                key={`c${indexColumn}l${indexRow}`}

                                                >
                                                    <span id={`c${indexColumn}l${indexRow}`}
                                                        className="normal-span"
                                                        onChange={() => console.log("entrou")}
                                                        onClick={e => writeSelectedCoordinates(e, indexRow, indexColumn)}
                                                        style={spanStyle}
                                                    >
                                                        {innerElem}
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
    )
}

export default Game;