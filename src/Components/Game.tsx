
import { useState, useEffect, createElement } from 'react';

import Sudoku from '../Sudoku';

import GameStyle from '../styles/GameStyle.module.css';




const Game: React.FC = () => {
    const sudo = new Sudoku("hard");

    var [arrSudoku, setArrSudoku] = useState<Array<number[]>>(
        [
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
    );

    var [numberSelected, setNumberSelected] = useState<{ row: number, column: number }>({ row: -1, column: -1 })





    const styleSelectedElement = (e: any, indexRow: number, indexColumn: number) => {
        const pattern: RegExp = /\d/g;

        const coord = e.target.className.match(pattern);

        if (!(arrSudoku[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && arrSudoku[indexRow][indexColumn] !== 0))
            setNumberSelected({ row: parseInt(coord[1]), column: parseInt(coord[0]) });

        console.log(numberSelected);
    }



    useEffect(() => {
        setArrSudoku(sudo.arr);
    }, [])

    return (
        <div className={GameStyle.gameContainer}>
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
                                            const elemType: string = "div";

                                            let elemContainer;
                                            let spanElement;

                                 

                                            let innerElem = elem;

                                            const isEmpty: boolean = arrSudoku[indexRow][indexColumn] === 0;
                                            const isSelected: boolean = indexColumn === numberSelected.column && indexRow === numberSelected.row;
                                            const isNonEditable: boolean = arrSudoku[indexRow][indexColumn] === sudo.arr[indexRow][indexColumn] && arrSudoku[indexRow][indexColumn] !== 0;
                                     

                                            // Criar elemento react do tipo <span> e estilizar para quando selecionar e destacar quais são os inicias que não podem ser modificados
                                            spanElement = createElement("span",
                                                {
                                                    className: `c${indexColumn}l${indexRow}`,
                                                    onClick: (e => styleSelectedElement(e, indexRow = indexRow, indexColumn = indexColumn)),
                                                    style: {
                                                        backgroundColor: isSelected ? "rgb(230,230,230)" : "white",
                                                        color:
                                                            (isEmpty && isSelected) && (
                                                                "rgb(230,230,230)"
                                                            ) || (
                                                                isEmpty &&
                                                                "white"
                                                            )
                                                            || ("rgb(53, 53, 53)"),
                                                        transition: "0.2s",
                                                        fontWeight: isNonEditable ? "600" : "400"
                                                    },
                                                },
                                                innerElem);

                                            // Estilização das bordas das matrizes 3x3
                                            if (isRowDiv === 0 && isColumnDiv === 0) {
                                                elemContainer = createElement(elemType,
                                                    { className: `${GameStyle.normalSPan} ${GameStyle.borderRightDown}`, key: `c${indexColumn}l${indexRow} ` },
                                                    spanElement);
                                            }

                                            if (isRowDiv !== 0 && isColumnDiv === 0) {
                                                elemContainer = createElement(elemType, { className: `${GameStyle.borderRight}`, key: `c${indexColumn}l${indexRow} ` }
                                                    , spanElement);
                                            }

                                            if (isRowDiv === 0 && isColumnDiv !== 0) {
                                                elemContainer = createElement(elemType, { className: `${GameStyle.borderDown}`, key: `c${indexColumn}l${indexRow} ` }
                                                    , spanElement);
                                            }

                                            if (isRowDiv !== 0 && isColumnDiv !== 0) {
                                                elemContainer = createElement(elemType, { className: `${GameStyle.innerBorder}`, key: `c${indexColumn}l${indexRow}` }
                                                    , spanElement);
                                            }


                                            return elemContainer;



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