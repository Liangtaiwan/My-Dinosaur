import React from 'react';
import { Image} from 'react-konva';

class Sky extends React.Component {

    constructor(props){
      super(props);
      this.state = {
        image: null
      };
  
    }
    componentDidMount() {
      const skyImage = new window.Image();
      skyImage.src = "img/cloud.png";
      skyImage.onload = () => {
        // setState will redraw layer
        // because "image" property is changed
        this.setState({
          image: skyImage
        });
      };
    }
  
    render() {
      return <Image 
              image={this.state.image}
              x={this.props.x}
              y={0}
              />;
    }
  }

  export default Sky;