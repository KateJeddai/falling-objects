import './css/main.scss';
import noUiSlider from 'nouislider';

const canvas = document.querySelector('#canvas'),
      ctx = canvas.getContext('2d'),
      h = window.innerHeight,
      w = window.innerWidth;
      canvas.height = h;
      canvas.width = w - 350;

let slider = document.getElementById('slider');
noUiSlider.create(slider, {
    start: [1, 5],
    step: 1,
    tooltips: [true, true],
    behaviour: 'drag',
    connect: true,
    range: {
        'min': 1,
        '50%': 5,
        'max': 10
    },
    pips: {
        mode: 'range',
        density: 11
    }
});
    const objectType = document.querySelector('#choose-type'),
          objectSize = document.querySelector('#choose-size'),
          wind = document.querySelector('#wind'),
          chooseWind = document.querySelector('#choose-wind');

    let windEffect = false,
        windDirection = '';

    chooseWind.addEventListener('change', () => {
        if(chooseWind[chooseWind.selectedIndex].value === 'east'){
         	windDirection = 'east';
        }
        else if (chooseWind[chooseWind.selectedIndex].value === 'west'){
            windDirection = 'west' ;
        }
    })       

let squares = [], triangles = [];
let speed2 = slider.noUiSlider.get();
    speed2 = speed2.map(val => parseInt(val));

slider.noUiSlider.on('update', () => {        
       speed2 = slider.noUiSlider.get();
       speed2 = speed2.map(val => parseInt(val));
      
       if(objectType[objectType.selectedIndex].value === 'square'){
          squares.forEach(s => {
              s.speed = randInt(speed2[0], speed2[1]);
          })
       }
       else if(objectType[objectType.selectedIndex].value === 'triangle'){
           triangles.forEach(t => {
              t.speed = randInt(speed2[0], speed2[1]);
           })
       }    
       else if(objectType[objectType.selectedIndex].value === 'all'){
            squares.forEach(s => {
                  s.speed = randInt(speed2[0], speed2[1]);
              })
              triangles.forEach(t => {
                  t.speed = randInt(speed2[0], speed2[1]);
              })
        }
    });
            

let size = 1;
let size_koef = 1;
objectSize.addEventListener('change', () => {
    size = objectSize[objectSize.selectedIndex].value;
       switch(size){
          case '1': 
        	     if(objectType[objectType.selectedIndex].value === 'square'){
               	    squares.forEach(s => {
               	    	s.h = 50;
               	    	s.w = 50;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'triangle'){
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 100;
                        t.x3 = t.x2 - 50;
                        t.y3 = t.y1 - 50;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'all'){
                 	squares.forEach(s => {
               	    	s.h = 50;
               	    	s.w = 50;
               	    })
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 100;
                        t.x3 = t.x2 - 50;
                        t.y3 = t.y1 - 50;
               	    })
                 }
        	     return size_koef = 1;        	    
          case '2': 
        	     if(objectType[objectType.selectedIndex].value === 'square'){
               	    squares.forEach(s => {
               	    	s.h = 100;
               	    	s.w = 100;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'triangle'){
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 200;
                        t.x3 = t.x2 - 100;
                        t.y3 = t.y1 - 100;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'all'){
                 	squares.forEach(s => {
               	    	s.h = 100;
               	    	s.w = 100;
               	    })
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 200;
                        t.x3 = t.x2 - 100;
                        t.y3 = t.y1 - 100;
               	    })
                 }
        	     return size_koef = 2;        	    
          case '3': 
                 if(objectType[objectType.selectedIndex].value === 'square'){
               	    squares.forEach(s => {
               	    	s.h = 150;
               	    	s.w = 150;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'triangle'){
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 300;
                        t.x3 = t.x2 - 150;
                        t.y3 = t.y1 - 150;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'all'){
                 	squares.forEach(s => {
               	    	s.h = 150;
               	    	s.w = 150;
               	    })
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 300;
                        t.x3 = t.x2 - 150;
                        t.y3 = t.y1 - 150;
               	    })
                 }
                 return size_koef = 3;        	   
          case '5':
                 if(objectType[objectType.selectedIndex].value === 'square'){
               	    squares.forEach(s => {
               	    	s.h = 250;
               	    	s.w = 250;
               	    })
                 }
                 else if(objectType[objectType.selectedIndex].value === 'triangle'){
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 500;
                        t.x3 = t.x2 - 250;
                        t.y3 = t.y1 - 250;
               	    })
                 } 
                 else if(objectType[objectType.selectedIndex].value === 'all'){
                 	squares.forEach(s => {
               	    	s.h = 250;
               	    	s.w = 250;
               	    })
               	    triangles.forEach(t => {
               	    	t.x2 = t.x1 + 500;
                        t.x3 = t.x2 - 250;
                        t.y3 = t.y1 - 250;
               	    })
                 }
                 return size_koef = 5;        	      
          default: return null;             
        }
});
      
      objectType.addEventListener('change', (e) => {
          let type = objectType[objectType.selectedIndex].value;
              switch(type){
              	  case 'square': 
              	      addSquares();
              	      triangles = [];
              	  break;
                  case 'triangle': 
                      addTriangles();
                      squares = [];
                  break;
                  case 'all':
                       if(triangles.length > 0){
                           addSquares();
                       }   
                       else if(squares.length > 0){
                           addTriangles();
                       } 
                       else if(triangles.length === 0 && squares.length === 0){
                           addSquares();
                           addTriangles();
                       }
                  default: return;
              }
      });

class Square{
    constructor(x, y, w, h, color, speed){
    	this.x = x;
        this.y = y;
        this.w = w  * size_koef;
        this.h = h  * size_koef;
        this.color = color;
        this.speed = speed * randInt(speed2[0], speed2[1]);
    }
    drawSquare(){
    	ctx.beginPath();
    	ctx.fillStyle = this.color;
    	ctx.fillRect(this.x, this.y, this.w, this.h);
    	ctx.closePath();
    }
    moveSquare(){
        this.y += this.speed;
    }
    windEffect(){
    	switch(windDirection){
    	   case 'east': 
    	       return this.x -= Math.sin(120); 
    	   case 'west':
    	       return this.x += Math.sin(120);
    	   default: return null; 
    	}      
    }
};

class Triangle{
    constructor(x1, y1, color, speed){
    	this.x1 = x1;
        this.y1 = y1;
        this.x2 = this.x1 + (100 * size_koef);
        this.y2 = this.y1;
        this.x3 = this.x2 - (50 * size_koef);
        this.y3 = this.y1 - (50 * size_koef);
        this.color = color;
        this.speed = speed * randInt(speed2[0], speed2[1]);
    }
    drawTriangle(){
    	ctx.beginPath();
    	ctx.fillStyle = this.color;
    	ctx.moveTo(this.x1, this.y1);
    	ctx.lineTo(this.x2, this.y2);
    	ctx.lineTo(this.x3, this.y3);
    	ctx.lineTo(this.x1, this.y1);
    	ctx.fill();
    	ctx.closePath();
    }
    moveTriangle(){
    	this.y1 += this.speed;
    	this.y2 = this.y1;
    	this.y3 = this.y1 - (50  * size_koef);
    }
    windEffect(){
    	switch(windDirection){
    	   case 'east': 
    	       this.x1 -= Math.sin(90);
    	       this.x2 = this.x1 + (100 * size_koef);
    	       this.x3 = this.x2 - (50 * size_koef);
    	       break;
    	   case 'west':
    	       this.x1 += Math.sin(90);
    	       this.x2 = this.x1 + (100 * size_koef);
    	       this.x3 = this.x2 - (50 * size_koef);
    	       break;
    	   default: return null; 
    	}
    }
};


wind.addEventListener('click', (e) => {
	      e.preventDefault();
	      windEffect = !windEffect;
	      windEffect ? chooseWind.style.display = 'block' : chooseWind.style.display = 'none';
          if(objectType[objectType.selectedIndex].value === 'square'){
               	    squares.forEach(s => {
               	    	s.windEffect();
               	    })
          }
          else if(objectType[objectType.selectedIndex].value === 'triangle'){
               	    triangles.forEach(t => {
               	    	t.windEffect();
               	    })
          }
          else if(objectType[objectType.selectedIndex].value === 'all'){
               	    squares.forEach(s => {
               	    	s.windEffect();
               	    })
               	    triangles.forEach(t => {
               	    	t.windEffect();
               	    })
          }
});

const addSquares = () => {
	squares.push(new Square(randInt(100, w-100), randInt(-50, -150), 50, 50, randomColor(), 1));
	setTimeout(addSquares, 500);
}
const moveSquares = () => {
	squares.forEach((square, i) => {
		square.moveSquare();
	});
}
const drawSquares = () => {
	squares.forEach((square) => {
		square.drawSquare();
		if(windEffect){
			square.windEffect();
		}
	});
	moveSquares();	
}


const addTriangles = () => {
	triangles.push(new Triangle(randInt(100, w-100), randInt(-100, -200), randomColor(), 1));
	setTimeout(addTriangles, 500);
}
const moveTriangles = () => {
	triangles.forEach((triangle, i) =>{
		triangle.moveTriangle();
	});
}
const drawTriangles = () => {
	triangles.forEach((triangle) => {
		triangle.drawTriangle();
		if(windEffect){
			triangle.windEffect();
		}
	});
	moveTriangles();	
}

const start = () => {
	ctx.clearRect(0, 0, w, h);    
    if(objectType[objectType.selectedIndex].value === 'square'){
    	drawSquares();
    }
	else if(objectType[objectType.selectedIndex].value === 'triangle'){
		drawTriangles();
	}
	else if(objectType[objectType.selectedIndex].value === 'all'){
		drawSquares();
	    drawTriangles();
	}
	setTimeout(start, 20);
}

start();

function randInt(min, max){
	return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomColor() {
    return '#' + Math.random().toString(16).slice(2, 8);
};

