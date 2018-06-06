import React, { Component } from 'react';
import { Stage, Layer,Text } from 'react-konva';
import Dinosaur from './component/Dinosaur'
import Sky from './component/Sky'
import Ground from './component/Ground'
import Obstacle from './component/Obstacle'


const JUMP_DELTA = 5;
const JUMP_MAX_HEIGHT = 53;

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      fps: 60,
      skySpeed: 40,
      groundSpeed: 100,
      skyPos: 0,
      groundPos: 0,
      jump_height:0,
      jummp_delta:0,
      status: 1,
      obs1Pos: 0,
      score: 0,
      highscore: 0,
      level: 200,
      deadtext: "",
    };
    this.width = 680
    this.jumpHeight = 0
    this.jumpDelta  = 0
    this.jumping = false
    if (window.innerWidth < 680){
      this.width = 340
    }
  }

  componentDidMount() {

    
    window.onkeypress = (e) =>{
      console.log(e.keyCode);
      if(e.keyCode === 38 || e.keyCode === 32){
        if (this.state.deadtext != ""){
          this.restart()
          return
        }
        if (this.jumping === false){
          this.jumpDelta = JUMP_DELTA;
          this.jumpHeight = JUMP_DELTA;
          this.jumping = true;
        };
      };
    };
    this.timerID = setInterval(() => this.tick(), 1000/this.state.fps);  
  }



  restart = () =>{
    this.setState({
      fps: 60,
      skySpeed: 40,
      groundSpeed: 100,
      skyPos: 0,
      groundPos: 0,
      jump_height:0,
      jummp_delta:0,
      status: 1,
      obs1Pos: 0,
      score: 0,
      level: 200,
      deadtext: ""
    });
  }
 


  tick() {
    if(this.state.obs1Pos <= 90 && this.state.obs1Pos >= 70 && this.jumpHeight <20){
      this.setState({
        deadtext: "Game Over!!!"
      })
      return
    }
    let skyPos = this.state.skyPos > -this.width ? (this.state.skyPos - this.state.skySpeed/this.state.fps) : (this.width);
    let groundPos = this.state.groundPos > -this.width ? (this.state.groundPos - (this.state.groundSpeed+this.state.level)/this.state.fps) : (this.state.groundPos + this.width);
    let obs1Pos = this.state.obs1Pos > 0 ? (this.state.obs1Pos -  (this.state.groundSpeed+this.state.level)/this.state.fps) : (this.width);
    let level = 200 + Math.floor(this.state.score/10)
    // let jump_height = this.state.jumping ? this.state.jump_height+1 :this.state.jump_height;
    // let jummp_delta
    this.jumpHeight = this.jumpHeight + this.jumpDelta;
    if (this.jumpHeight <= 3) {
      this.jumpHeight = 0;
      this.jumpDelta = 0;
      this.jumping  = false;
    }
    else if (this.jumpHeight < JUMP_MAX_HEIGHT && this.jumpDelta > 0) {
      this.jumpDelta = (this.jumpHeight * this.jumpHeight) * 0.001033 - this.jumpHeight * 0.137 + 5 + this.state.level/200;
    }
    else {
      this.jumpDelta = -((this.jumpHeight * this.jumpHeight) * 0.001033 - this.jumpHeight * 0.137 + 5   + this.state.level/200);
    }      
    
    
    
    let score = this.state.score +  0.25
    let highscore = this.state.highscore;
    if (this.state.highscore < this.state.score){
      highscore = score;
    }
    let status
    if (score<1000){
      status = (score%2===0) ? (this.state.status+1) % 3 : this.state.status
    }
    else if (score<2500){
      status = (score%1===0) ? (this.state.status+1) % 3 : this.state.status
    }
    else{
      status = (score%0.5===0) ? (this.state.status+1) % 3 : this.state.status
    }
    this.setState({
        skyPos: skyPos,
        groundPos: groundPos,
        status: status,
        obs1Pos: obs1Pos,
        // jump_height: jump_height,
        score: score,
        level: level,
        highscore: highscore,
    });
  }

  render() {
    let score = Math.floor(this.state.score)
    let scoreText = "0".repeat(5-score.toString().length) + score.toString()
    let highscore = Math.floor(this.state.highscore)
    let highscoreText ="HI " + "0".repeat(5-highscore.toString().length) + highscore.toString() 
    return (
      <Stage width={this.width} height={window.innerHeight}>
        <Layer>
          <Text text="Welocome to my dinosaur game!!!" fontStyle="bold" />
          <Text text={scoreText} x={this.width-50} fill="#595959" fontSize="15" fontStyle="bold"/>
          <Text text={highscoreText} x={this.width-140} fill="#595959" fontSize="15" fontStyle="bold"/>
          <Sky x={this.state.skyPos}/>
          <Ground x={this.state.groundPos}/>
          <Dinosaur jump_height={this.jumpHeight}  status={this.state.status} />
          <Obstacle x={this.state.obs1Pos}/>
          <Text text={this.state.deadtext} x={this.width/2-80} y={40} fill="#595959" fontSize="24" fontStyle="bold" onClick={this.restart} />
        </Layer>
      </Stage>
    );
  }
}


export default App;
