/**
 * Implementation of Conway's game of Life
 */
const MODULO = 8;

/**
 * Make a 2D array helper function
 */
function Array2D(width, height) {
  let a = new Array(height);

  for (let i = 0; i < height; i++) {
    a[i] = new Array(width);
  }

  return a;
}

/**
 * Life class
 */
class Life {

  /**
   * Constructor
   */
  constructor(width, height) {
    // !!!! IMPLEMENT ME !!!!

    this.width = width;
    this.height = height;
    this.currentBufferIndex = 0;
    this.buffer = [
	    Array2D(width, height),
	    Array2D(width, height)
    ];
    this.north = 1;
    this.south = 1;
    this.east = 1;
    this.west = 1;
    this.clear();
  }
  
  /**
   * Return the current active buffer
   * 
   * This should NOT be modified by the caller
   */
  getCells() {
    // !!!! IMPLEMENT ME !!!!
    return this.buffer[this.currentBufferIndex];
  }

  /**
   * Clear the life grid
   */
  clear() {
    // !!!! IMPLEMENT ME !!!!
    for(let y = 0; y < this.height; y++)
		  this.buffer[this.currentBufferIndex][y].fill(0);
  }
  
  /**
   * Randomize the life grid
   */
  randomize() {
    // !!!! IMPLEMENT ME !!!!
    let buffer = this.buffer[this.currentBufferIndex];
	  for(let y = 0; y < this.height; y++)
		  for(let x = 0; x < this.width; x++) 
			  buffer[y][x] = Math.floor(Math.random() * MODULO)
  }

  /**
   * Run the simulation for a single step
   */
  step() {
    // !!!! IMPLEMENT ME !!!!
    let backBufferIndex = this.currentBufferIndex === 0 ? 1 : 0;
	  let currentBuffer = this.buffer[this.currentBufferIndex];
	  let backBuffer = this.buffer[backBufferIndex];
	  
	  const hasInfectiousNeighbor = (x,y) => {
	  	const nextValue = (currentBuffer[y][x] + 1 ) % MODULO;
    
      //West  
      if(this.west)
      if (x > 0)  
        if(currentBuffer[y][x-1] === nextValue)
          return true;
      //North
      if(this.north)		
      if (y > 0)
        if (currentBuffer[y - 1][x] === nextValue)
          return true;
      
      //East
      if(this.east)
      if (x < this.width - 1)
        if (currentBuffer[y][x + 1] === nextValue)
          return true;
      
      //South
      if(this.south)
      if (y < this.height - 1)
        if (currentBuffer[y + 1][x] === nextValue)
          return true;
		  
		  return false;		
	  }
	  
	  for (let y = 0; y < this.height; y++)
		  for (let x = 0; x < this.width; x++) 
			  if (hasInfectiousNeighbor(x,y))
				 backBuffer[y][x] = (currentBuffer[y][x] + 1 ) % MODULO;
	  		  else
				 backBuffer[y][x] = currentBuffer[y][x];
	  
	  this.currentBufferIndex = backBufferIndex;
  }
}

export default Life;
