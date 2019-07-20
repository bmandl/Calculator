import React from 'react';
import ReactDOM from 'react-dom';

import './Calculator.scss';

const buttons = [
    {
        id : 'zero',
        symbol: '0',
        class : 'number'
    },
    {
        id : 'one',
        symbol: '1',
        class : 'number'
    },
    {
        id : 'two',
        symbol: '2',
        class : 'number'
    },
    {
        id : 'three',
        symbol: '3',
        class : 'number'
    },
    {
        id : 'four',
        symbol: '4',
        class : 'number'
    },
    {
        id : 'five',
        symbol: '5',
        class : 'number'
    },
    {
        id : 'six',
        symbol: '6',
        class : 'number'
    },
    {
        id : 'seven',
        symbol: '7',
        class : 'number'
    },
    {
        id : 'eight',
        symbol: '8',
        class : 'number'
    },
    {
        id : 'nine',
        symbol: '9',
        class : 'number'
    },
    {
        id : 'decimal',
        symbol: '.',
        class : 'number'
    },
    {
        id : 'add',
        symbol: '+',
        class : 'math'
    },
    {
        id : 'subtract',
        symbol: '-',
        class : 'math'
    },
    {
        id : 'multiply',
        symbol: 'x',
        class : 'math'
    },
    {
        id : 'divide',
        symbol: '/',
        class : 'math'
    },
    {
        id : 'clear',
        symbol: 'C',
        class : 'util'
    },
    {
        id : 'equals',
        symbol : '=',
        class : 'util'
    }
];

class Display extends React.Component {

    render(){
        return(
            <div id="display">
                <div className="formula-screen">{this.props.formula}</div>
                <div className="value-screen">{this.props.value}</div>
            </div>
        );
    }
}

class Keyboard extends React.Component {

    render() {
        let btns = this.props.buttons.map((button,i,buttonsArr) => {
            let operation = buttonsArr[i].class == 'number' ? this.props.numbers : 
                        buttonsArr[i].class == 'math' ? this.props.math : this.props.utils;

            return (
                <button id={buttonsArr[i].id} value={buttonsArr[i].symbol} className={buttonsArr[i].class} onClick={operation}>
                    {buttonsArr[i].symbol}
                </button>
            );
        })
        return(
            <div className="keyboard">                
                {btns}
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props){
        super(props);

        this.state = (
            {
                displayValue: '0',
                prevVal: '0',
                formula: '',
                currentSign: 'pos',
                lastClicked: ''
            }
        );
    }

    render(){
        return(
            <div className="container">
                <Display formula={this.state.formula} value={this.state.displayValue}/>
                <Keyboard buttons={buttons}/>
            </div>
        );
    }
    
}

export default App;