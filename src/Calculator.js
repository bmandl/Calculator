import React from 'react';
import ReactDOM from 'react-dom';

import './Calculator.scss';

const buttons = [
    {
        id : 'zero',
        symbol: '0',
        class : 'button'
    },
    {
        id : 'one',
        symbol: '1',
        class : 'button'
    },
    {
        id : 'two',
        symbol: '2',
        class : 'button'
    },
    {
        id : 'three',
        symbol: '3',
        class : 'button'
    },
    {
        id : 'four',
        symbol: '4',
        class : 'button'
    },
    {
        id : 'five',
        symbol: '5',
        class : 'button'
    },
    {
        id : 'six',
        symbol: '6',
        class : 'button'
    },
    {
        id : 'seven',
        symbol: '7',
        class : 'button'
    },
    {
        id : 'eight',
        symbol: '8',
        class : 'button'
    },
    {
        id : 'nine',
        symbol: '9',
        class : 'button'
    },
    {
        id : 'decimal',
        symbol: '.',
        class : 'button'
    },
    {
        id : 'add',
        symbol: '+',
        class : 'button math'
    },
    {
        id : 'subtract',
        symbol: '-',
        class : 'button math'
    },
    {
        id : 'multiply',
        symbol: 'x',
        class : 'button math'
    },
    {
        id : 'divide',
        symbol: '/',
        class : 'button math'
    },
    {
        id : 'clear',
        symbol: 'C',
        class : 'button util'
    },
    {
        id : 'equals',
        symbol : '=',
        class : 'button util'
    }
];



class App extends React.Component {

    render() {
        let btns = buttons.map((button,i,buttonsArr) => {
            return (
                <div id={buttonsArr[i].id} className={buttonsArr[i].class}>
                    {buttonsArr[i].symbol}
                </div>
            );
        })
        return(
            <div className="container">
                {btns}
            </div>
        );
    }
}

export default App;