import React from 'react';
import {Image} from 'react-konva';

class Obstacle extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        image: null
      };
  
    }
    componentDidMount() {
      const obstacleImage = new window.Image();
      obstacleImage.src = "img/obstacle.png";
      obstacleImage.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          image: obstacleImage
        });
      };
    }
  
    render() {
      return <Image 
              image={this.state.image}
              x={this.props.x}
              y={76}
              />;
    }
  }

  export default Obstacle;