import React from 'react';
import Board from './Board';
import calculateWinner from './CalculateWinner';

class Game extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      oIsNext: true,
      stepNum: 0,
    };
  }

  handleClick(i){
    const history = this.state.history.slice(0, this.state.stepNum + 1);
    const current = history[history.length - 1]; 
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]){
      return;
    }
    squares[i] = this.state.oIsNext ? 'O' : 'X';
    this.setState({
      history: history.concat([{
        squares: squares
      }]),
      oIsNext: !this.state.oIsNext,
      stepNum: history.length,
    })
  }

  jumpTo(i){
    this.setState({
      stepNum: i,
      oIsNext: (i % 2) === 0,
    });
  }

  render(){
    const history = this.state.history;
    const current = history[this.state.stepNum];
    const winner = calculateWinner(current.squares);

    const buttons = history.map((step, buttonNum)=>{
      const show = buttonNum ?
        'Go to move #' + buttonNum :
        'Game start';
      if(buttonNum !== history.length - 1){
        return(
          <li key={buttonNum}>
            <button onClick={()=>this.jumpTo(buttonNum)}>
              {show}
              {/* 過去の盤面が表示されるように変更 */}
              <Board 
                squares={step.squares}
                onClick={(i)=>{return;}}
              />
            </button>
          </li>
        )
      }
    })

    let status;
    if(winner){
      status = 'Winner: ' + winner;
    } else{
      status = 'next player: ' + (this.state.oIsNext ? 'O' : 'X');
    }

    return(
      <div>
        <div className="game-board">
          <Board 
            squares={current.squares}
            onClick={(i)=>this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{buttons}</ol>
        </div>
      </div>
    );
  }
}

export default Game;