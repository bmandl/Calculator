import React from 'react';
import ReactDOM from 'react-dom';

import './Calculator.scss';

const isOperator = /[x/+-]/,
    endsWithOperator = /[x+/-]$/,
    endsWithNumber = /[0-9]$/;

const buttons = [
    {
        id: 'zero',
        symbol: '0',
        class: 'number'
    },
    {
        id: 'one',
        symbol: '1',
        class: 'number'
    },
    {
        id: 'two',
        symbol: '2',
        class: 'number'
    },
    {
        id: 'three',
        symbol: '3',
        class: 'number'
    },
    {
        id: 'four',
        symbol: '4',
        class: 'number'
    },
    {
        id: 'five',
        symbol: '5',
        class: 'number'
    },
    {
        id: 'six',
        symbol: '6',
        class: 'number'
    },
    {
        id: 'seven',
        symbol: '7',
        class: 'number'
    },
    {
        id: 'eight',
        symbol: '8',
        class: 'number'
    },
    {
        id: 'nine',
        symbol: '9',
        class: 'number'
    },
    {
        id: 'decimal',
        symbol: '.',
        class: 'number'
    },
    {
        id: 'add',
        symbol: '+',
        class: 'math'
    },
    {
        id: 'subtract',
        symbol: '-',
        class: 'math'
    },
    {
        id: 'multiply',
        symbol: 'x',
        class: 'math'
    },
    {
        id: 'divide',
        symbol: '/',
        class: 'math'
    },
    {
        id: 'clear',
        symbol: 'C',
        class: 'util'
    },
    {
        id: 'equals',
        symbol: '=',
        class: 'util'
    }
];

class Display extends React.Component {

    render() {
        return (
            <div>
                <div id="formula" className="formula-screen">{this.props.formula}</div>
                <div id="display" className="value-screen">{this.props.value}</div>
            </div>
        );
    }
}

class Keyboard extends React.Component {

    render() {
        let btns = this.props.buttons.map((button, i, buttonsArr) => {
            let operation = buttonsArr[i].class == 'number' ? this.props.numbers :
                buttonsArr[i].class == 'math' ? this.props.math : this.props.utils;

            return (
                <button id={buttonsArr[i].id} value={buttonsArr[i].symbol} className={buttonsArr[i].class} onClick={operation}>
                    {buttonsArr[i].symbol}
                </button>
            );
        });
        return (
            <div className="keyboard">
                {btns}
            </div>
        );
    }
}


class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = (
            {
                displayValue: '0',
                prevVal: '0',
                formulaDisplay: '',
                currentSign: 'pos',
                lastClicked: ''
            }
        );

        this.handleNumbers = this.handleNumbers.bind(this);
        this.handleMath = this.handleMath.bind(this);
        this.handleUtils = this.handleUtils.bind(this);
        this.clear = this.clear.bind(this);
        this.evaluate = this.evaluate.bind(this);
        this.decimal = this.decimal.bind(this);
    }

    handleNumbers(e) {
        const btn = e.target.value;
        if (btn != '.') {
            if (this.state.evaluated === true) {
                this.setState(
                    {
                        displayValue: btn,
                        formulaDisplay: btn != '0' ? btn : '',
                        evaluated: false
                    }
                );
            }

            else {
                this.setState(state => (
                    {
                        displayValue:
                            state.displayValue == '0' || isOperator.test(state.displayValue) ? btn : state.displayValue + btn,
                        formulaDisplay:
                            state.displayValue == '0' && btn == '0' ? state.formulaDisplay :
                                /([^.0-9]0)$/.test(state.formulaDisplay) ? state.formulaDisplay.slice(0, -1) + btn : state.formulaDisplay + btn
                    }
                )
                );
            }
        }
        else this.decimal();
    }

    decimal() {
        if (this.state.evaluated === true) {
            this.setState(
                {
                    displayValue: '0.',
                    formulaDisplay: '0.',
                    evaluated: false
                }
            )
        }
        else {
            this.setState(state => (
                {
                    displayValue:
                        state.displayValue.includes('.') ? state.displayValue : isOperator.test(state.displayValue) ? '0.' : state.displayValue + '.',
                    formulaDisplay:
                        endsWithOperator.test(state.formulaDisplay) || state.formulaDisplay === '-' ?
                            state.formulaDisplay + '0.' : /[.]$/.test(state.formulaDisplay) || state.displayValue.includes('.') ?
                                state.formulaDisplay : state.formulaDisplay === '' ? '0.' : state.formulaDisplay + '.',
                    evaluated: false
                }
            ));
        }
    }

    handleMath(e) {
        let btn = e.target.value;
        if (this.state.evaluated === true) {
            this.setState(state => (
                {
                    displayValue: btn,
                    formulaDisplay: state.displayValue + btn,
                    evaluated: false
                }
            ));
        }

        this.setState(state => (
            {
                displayValue:
                    endsWithNumber.test(state.displayValue) || isOperator.test(state.displayValue) ? btn : state.displayValue,
                formulaDisplay:
                    state.formulaDisplay === '' && btn != '-' ? 
                    '0' + btn : endsWithNumber.test(state.formulaDisplay) /*|| (btn === '-' && /[x/]$/.test(state.formulaDisplay))*/ ? 
                    state.formulaDisplay + btn : endsWithOperator.test(state.formulaDisplay) ? 
                    state.formulaDisplay.slice(0, -1) + btn : state.formulaDisplay
            }
        )
        );
    }

    handleUtils(e) {
        let btn = e.target.value;

        switch (btn) {
            case '=':
                this.evaluate();
                break;
            case 'C':
                this.clear()
        }
    }

    clear() {
        this.setState(
            {
                displayValue: '0',
                formulaDisplay: '',
                evaluated: false
            }
        );
    }

    evaluate() {
        let expression = endsWithOperator.test(this.state.formulaDisplay) || /[.]$/.test(this.state.formulaDisplay) ? 
        this.state.formulaDisplay.slice(0, -1) : this.state.evaluated === true ? this.state.displayValue : this.state.formulaDisplay;
        expression = expression.replace(/x/g,'*');
        let result = eval(expression);

        this.setState(state => (
            {
                displayValue: result.toString(),
                formulaDisplay: '',
                evaluated: true
            }
        ));
    }

    render() {
        return (
            <div className="container">
                <Display formula={this.state.formulaDisplay} value={this.state.displayValue} />
                <Keyboard buttons={buttons}
                    numbers={this.handleNumbers}
                    math={this.handleMath}
                    utils={this.handleUtils} />
            </div>
        );
    }

}

export default App;