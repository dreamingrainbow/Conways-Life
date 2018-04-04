import React, { Component } from 'react';
import CCA from './cca';
import './App.css';

const COLORS = [
  [0, 0, 0],
  [0x8f, 0, 0x5f],
  [0x5f, 0, 0x8f],
  [0, 0, 0xff],
  [0, 0x5f, 0x7f],
  [0x5f, 0x8f, 0x7f],
  [0x8f, 0xff, 0x7f],
  [0xff, 0x5f, 0x7f],
]

/**
 * CCA canvas
 */
class CCACanvas extends Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);
    let cca = new CCA(props.width, props.height);
    this.step() = cca.step.bind(this);
    this.getCells = cca.getCells.bind(this);
    this.randomize = cca.randomize.bind(this);
    
  }

  /**
   * Component did mount
   */
  componentDidMount() {
    requestAnimationFrame(() => { this.animFram(); });
  }

  /**
   * Handle an animation frame
   */
  animFrame() {
    const { width, height } = this.props
    const cells = this.getCells()
    let canvas = this.refs.canvas;    
    let ctx = canvas.getContext('2d');
    let imageData = ctx.getImageData(0,0,width,height);
    //[r1,b1,g1,r2,b2,g2,r3,b3,g3]
    for(let y = 0; y < height; y++)
      for(let x = 0; x < width; x++)
        const index = (y * width + x) * 4;
        const status = cells[y][x];
        imageData.data[index + 0] = COLORS[status][0];
        imageData.data[index + 1] = COLORS[status][1];
        imageData.data[index + 2] = COLORS[status][2];
        imageData.data[index + 3] = 0xff;//alpha 0xff = opaque
    
    ctx.putImageData(imageData, 0, 0);
    this.step();
    
    requestAnimationFrame(() => { this.animFrame(); });
  }

  /**
   * Render
   */
  render() {
    return <canvas ref="canvas" width={this.props.width} height={this.props.height} />
  }
}

/**
 * CCA holder component
 */
class CCAApp extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div>
        <CCACanvas width={400} height={300} />
      </div>
    )
  }
}

/**
 * Outer App component
 */
class App extends Component {

  /**
   * Render
   */
  render() {
    return (
      <div className="App">
        <CCAApp />
      </div>
    );
  }
}

export default App;
