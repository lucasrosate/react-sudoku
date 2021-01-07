import AppStyle from './styles/AppStyle.module.css';
import Game from './Components/Game';


const App: React.FC = () => {



    return (
        <div className={AppStyle.appContainer} id="App">
            <header className="App-header">
                <div className={AppStyle.title}><h1>Sudoku</h1></div>
                <div className={AppStyle.componentsContainer} >
                    <Game />
                </div>
            </header>
        </div>


    )
}

export default App;