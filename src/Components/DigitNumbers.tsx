import { useState } from 'react';

import DigitNumbersStyle from '../styles/DigitNumbersStyle.module.css';

const DigitNumbers: React.FC = () => {

    const allowedNumbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

    var [selectedNumber, setSelectedNumber] = useState<number>(0);
    return (
        <div className={DigitNumbersStyle.windowContainer}>
            <h1>Selecione e escolha o número ou digite</h1>
            <div className={DigitNumbersStyle.digitContainer}>
                {
                    allowedNumbers.map((allowedNumber => <button className={`$button{allowedNumber}`}>{allowedNumber}</button>))
                }
            </div>

        </div>
    )
}

export default DigitNumbers;