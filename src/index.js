import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { // function component, does not have state, only render method
    return ( // create button for square
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}



class Board extends React.Component { // board component
    constructor(props) { // store the state of each square in Board component
        super(props);
        this.state = {
            squares: Array(9).fill(null), // start the game with all null
            xIsNext: true,
        };
    }

    handleClick(i) { // when a square is clicked
        const squares = this.state.squares.slice();
        if(calculateWinner(squares) || squares[i]){ // if already won or square is already player
            return; // ignore click
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O'; // place x or o depending on turn
        this.setState({ // change state of square and turn
            squares: squares,
            xIsNext: !this.state.xIsNext,
        });
    }

    renderSquare(i) { // render individual square
        return (
            <Square // call on Square's render
                value={this.state.squares[i]} // pass value as a prop to Square component
                onClick={() => this.handleClick(i)}
            />
        );
    }

    render() { // every component has a render method that is called on by react when it detects somethis has changed

        const winner = calculateWinner(this.state.squares); // check winner
        let status;
        if (winner) { // if there is a winner
            status = 'Winner: ' + winner;
        }
        else { // if no winner
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }
        return ( // everything under return will be displayed
            <div>
                <div className="status">{status}</div>
                <div className="board-row">
                    {this.renderSquare(0)}
                    {this.renderSquare(1)}
                    {this.renderSquare(2)}
                </div>
                <div className="board-row">
                    {this.renderSquare(3)}
                    {this.renderSquare(4)}
                    {this.renderSquare(5)}
                </div>
                <div className="board-row">
                    {this.renderSquare(6)}
                    {this.renderSquare(7)}
                    {this.renderSquare(8)}
                </div>
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++){
        const [a,b,c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
