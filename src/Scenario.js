import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Sprite from './sprite'
import  {VelocityComponent} from 'velocity-react';
import character from './assests/character-sprite.png';
import './Scenario.css';

class Scenario extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arenaWidth: 0,
      arenaHeight: 0,
    }
    this.arena = React.createRef();
  }

  componentDidMount() {
    const arena = ReactDOM.findDOMNode(this.arena.current).getBoundingClientRect();
    
    this.setState({
      arenaWidth: arena.width,
      arenaHeight: arena.height,
    })
  }

  getSpots = () => {
    const { userPosition } = this.props;

    return (
      <div className="column">
        <div className="spots">
            {userPosition === 0 && (
            <Sprite
              src={character}
              scale={1}
              state={2}
              steps={[9, 9, 0, 4, 5]}
            />)}
        </div>
        <div className="spots">
            {userPosition === 1 && (
            <Sprite
              src={character}
              scale={1}
              state={2}
              steps={[9, 9, 0, 4, 5]}
            />)}
        </div> 
        <div className="spots">
            {userPosition === 2 && (
            <Sprite
              src={character}
              scale={1}
              state={2}
              steps={[9, 9, 0, 4, 5]}
            />)}
        </div> 
        <div className="spots">
            {userPosition === 3 && (
            <Sprite
              src={character}
              scale={1}
              state={2}
              steps={[9, 9, 0, 4, 5]}
            />)}
        </div>
      </div>
    );
  }

  showFeedback = () => {
    if (this.props.answer === true) console.log("Acertou");
    if (this.props.answer === false) console.log("Errou");
  }

  render() {
    return (
      <div className="scenario">
        <div className="arena" ref={this.arena}>
          <Wall 
            arenaHeight={this.state.arenaHeight} 
            arenaWidth={this.state.arenaWidth}
            getNextQuestion={this.props.getNextQuestion}
            shouldRenderWall={this.props.shouldRenderWall}
          />
        </div>
        {this.showFeedback()}
        {this.getSpots()}
      </div>
    );
  }
}

export default Scenario;

class Wall extends Component {
  constructor(props) {
    super(props);
    this.wall = React.createRef();    
  }
  componentDidMount() {
    this.wall.current.addEventListener('transitionend', this.transitionFinished)
  }

  componentWillUnMount() {
    this.wall.current.removeEventListener('transitionend', this.transitionFinished)
  }

  transitionFinished = () => {    
    this.props.getNextQuestion();
  }

  getStyle = () => {
    if (this.props.shouldRenderWall) {
      return {
        transform: `translateX(${-this.props.arenaWidth - (this.props.arenaWidth * 0.1)}px)`,
        transition: `3s linear`,
      }
    }

    return {
      transform: `translateX(${this.props.arenaWidth * 0.1}px)`,
      transition: "none",
    }
  }

  render() {
    return <div className="wall" ref={this.wall} style={this.getStyle()}>{this.props.correctDoor}</div>;
  }
}