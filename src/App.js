import React, { Component } from 'react';
import Scenario from './Scenario';
import './App.css';

const UP = 38;
const DOWN = 40;
const LAST_ROW = 8;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      wallPosition: 0,
      userPosition: 0,
      shouldRenderWall: true,
    }
  }
  componentWillMount() {
    this.setState({correctDoor: Math.floor(Math.random() * 4)});
  }

  componentDidMount() {
    document.addEventListener("keydown", this.moveUser, false);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.moveUser, false);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.wallPosition === LAST_ROW) {
      this.setState({answer: this.checkAnswer()})
    }
  }

  updateWallPosition = () => {
    let position = this.state.wallPosition + 1;
    
    if (position > LAST_ROW) position = 0;
    
    this.setState({
      wallPosition: position,
      answer: null,
    })
  }

  checkAnswer = () => {
    const { correctDoor, userPosition } = this.state;

    if (correctDoor === userPosition) {
      return true;
    } else {
      return false;
    }
  }

  moveUser = (event) => {
    switch(event.keyCode) {
      case UP: 
        this.setState({userPosition: Math.max(this.state.userPosition - 1, 0)});
        break;
      case DOWN:
        this.setState({userPosition: Math.min(this.state.userPosition + 1, 3)});
        break;
      default:
        return;   
    }
  }

  getNextQuestion = () => {
    this.setState({
      correctDoor: Math.floor(Math.random() * 4),
      shouldRenderWall: false,
    });

    setTimeout(() => this.setState({shouldRenderWall: true}), 10);
  }

  render() {
    const { wallPosition, userPosition, correctDoor } = this.state;
    
    return (
      <div className="world">
        <Scenario 
          wallPosition={wallPosition} 
          getNextQuestion={this.getNextQuestion}
          correctDoor={correctDoor}
          userPosition={userPosition}
          shouldRenderWall={this.state.shouldRenderWall}
        />
      </div>
    );
  }
}

export default App;
