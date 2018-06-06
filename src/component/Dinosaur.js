import React from 'react';
import {Image} from 'react-konva';

class Dinosaur extends React.Component {

    constructor(props){
      super(props);
      const dinosaurImage = new window.Image();
      const dinosaurLeftImage = new window.Image();
      const dinosaurRightImage = new window.Image();
      const dinosaurDieImage = new window.Image();
      dinosaurImage.src = "img/dinosaur.png";
      dinosaurLeftImage.src = "img/dinosaur_left.png";
      dinosaurRightImage.src = "img/dinosaur_right.png";
      dinosaurDieImage.src = "img/dinosaur_die.png";
      this.playerImage = [dinosaurImage, dinosaurLeftImage, dinosaurRightImage, dinosaurDieImage];
    }

    render() {
      return <Image 
              image={this.playerImage[this.props.status]} 
              x={80}
              y={64-this.props.jump_height}
              />;
    }
  }

  export default Dinosaur;