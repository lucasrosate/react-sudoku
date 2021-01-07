import { memo, RefObject } from 'react';
import { CSSProperties } from 'styled-components';
import GameCellStyle from '../styles/GameCellStyle.module.css';

type Props = {
    indexRow: number,
    indexColumn: number,
    elem: number
    arrSudokuRef: RefObject<number[][]>,
    writeSelectedCoordinates: Function,
    selectedNumber: SelectedNumberState
    sudo: SudokuClassInterface
}



const GameCell: React.FC<Props> = (props: Props) => {

    // Renderizar as linhas mais destacadas de cada matriz 3x3
    const isRowDiv: number = (props.indexRow + 1) % 3;
    const isColumnDiv: number = (props.indexColumn + 1) % 3;

    const isEmpty: boolean = props.arrSudokuRef.current![props.indexRow][props.indexColumn] === 0;
    const isSelected: boolean = props.indexColumn === props.selectedNumber.column && props.indexRow === props.selectedNumber.row;
    const isNonEditable: boolean = props.arrSudokuRef.current![props.indexRow][props.indexColumn] === props.sudo.arr[props.indexRow][props.indexColumn] && props.sudo.arr[props.indexRow][props.indexColumn] !== 0;
    const isPossible: boolean = isNonEditable || isEmpty ? false : props.sudo.possible(props.arrSudokuRef.current!, props.indexRow, props.indexColumn, props.elem, true);



    const spanStyle: CSSProperties = {
        backgroundColor: isSelected ? "rgb(230,230,230)" : "white",
        color: isNonEditable ? "#3d8abd" : isEmpty && isSelected ? "rgb(230,230,230)" : isPossible ? "#3dbd7d" : isEmpty ? "white" : "#f34c4c",
        fontWeight: isNonEditable ? 600 : 400
    }

    // Criar elemento da célular de cada lacuna do sudoku, juntamente com as interações e estilos
    return (
        <>
            <div key={props.indexColumn} className={
                (isRowDiv === 0 && isColumnDiv === 0) ? `${GameCellStyle.normalSpan} ${GameCellStyle.borderRightDown}`
                    : (isRowDiv !== 0 && isColumnDiv === 0) ? `${GameCellStyle.borderRight}`
                        : (isRowDiv === 0 && isColumnDiv !== 0) ? `${GameCellStyle.borderDown}` : `${GameCellStyle.innerBorder}`
            }


            >
                <span id={`c${props.indexColumn}l${props.indexRow}`}
                    className="normal-span"
                    onClick={e => props.writeSelectedCoordinates(e, props.indexRow, props.indexColumn)}
                    style={spanStyle}
                >
                    {props.elem}
                </span>
            </div>
        </>

    )

}

export default memo(GameCell);