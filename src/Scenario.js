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
      style: {},
    }
    this.arena = React.createRef();
    this.wall = React.createRef();
  }

  componentDidMount() {
    this.wall.current.addEventListener('transitionend', this.transitionFinished)
    const arena = ReactDOM.findDOMNode(this.arena.current).getBoundingClientRect();
    console.log(arena)
    this.setState({
      arenaWidth: arena.width,
      arenaHeight: arena.height,
      style: this.getStyle(arena.height, arena.width)
    })
  }

  componentWillUnMount() {
    this.wall.current.removeEventListener('transitionend', this.transitionFinished)
  }

  transitionFinished = () => {
    const { userPosition, correctDoor } = this.props;

    if (userPosition === correctDoor) {
      console.log("Acertou miseravi")
    } else {
      console.log("ERRROOOOU")      
    }

    this.props.getNextQuestion();
    this.resetAnimation();
  }
  
  getStyle = (arenaHeight, arenaWidth) => {
    console.log(arenaHeight, arenaWidth)
    return {
      transform: `translateY(${arenaHeight  - (arenaWidth * 0.1)}px)`,
      transition: `5s linear`,
    }
  }
  
  resetAnimation = () => {
    this.setState({
      style: {
        transform: "translateY(0)",
        background: 'black',
      }
    }, () => {
      this.restartAnimation();
    });
  }

  restartAnimation = () => {
    this.setState({
      style: this.getStyle(this.state.arenaHeight, this.state.arenaWidth)
    });
  }

  getSpots = () => {
    const { userPosition } = this.props;

    return (
      <div className="row">
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

  // getWall = () => {
  //   const { wallPosition } = this.props;
    
  //   const amountOfRows = [...Array(9).keys()];
  //   const rows = amountOfRows.map((value, index) => {
  //     if (index === wallPosition) {
  //       return (
  //         <div className="row">
  //           <div className="door"></div>
  //           <div className="door"></div>
  //           <div className="door"></div>
  //           <div className="door"></div>
  //         </div>
  //       )
  //     }

  //     return <div className="row"></div>;
  //   });

  //   return rows;
  // }

  showFeedback = () => {
    if (this.props.answer === true) console.log("Acertou");
    if (this.props.answer === false) console.log("Errou");
  }

  render() {
    return (
      <div className="scenario">
        {/* {this.getWall()} */}
        <div className="arena" ref={this.arena}>
        <VelocityComponent animation={{ transform: "translateY(500px)" }} duration={3000}>
          <div className="wall" ref={this.wall} >{this.props.correctDoor}</div>
        </VelocityComponent>
        </div>
        {this.showFeedback()}
        {this.getSpots()}
      </div>
    );
  }
}

export default Scenario;
