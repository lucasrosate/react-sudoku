import AppStyle from './styles/AppStyle.module.css';
import './styles/base.css';

import Game from './Components/Game';
import DigitNumbers from './Components/DigitNumbers';


const App: React.FC = () => {
    


    return (
            <div className={AppStyle.appContainer} id="AppMain">
                <div className={AppStyle.title}><h1>Sudoku</h1></div>
                <div className={AppStyle.componentsContainer} >
                    <Game />
                </div>
            </div>
    )
}

export default App;