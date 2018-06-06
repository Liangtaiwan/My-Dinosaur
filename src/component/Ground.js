import React from 'react';
import {Image} from 'react-konva';

class Ground extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        image: null
      };
  
    }
    componentDidMount() {
      const groundImage = new window.Image();
      groundImage.src = "img/ground.png";
      groundImage.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          image: groundImage
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
  

  export default Ground;