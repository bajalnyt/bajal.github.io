var canvas = document.getElementById('myCanvas');
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function Circle(x, y, radius, index) {
    this.x =x;
    this.y =y;
    this.radius = radius;
    this.index = index;
  
    c.lineWidth = 0;
   
    this.draw = function () {
      c.beginPath();
      if(index<100)
      c.fillStyle='red';
      else c.fillStyle='pink';

      c.arc( this.x , this.y, radius, 0, 2*Math.PI, false); // center, radius,  start and end angles in radians,
      c.fill();
      //c.stroke();
    }
  
    this.update = function() {
      this.draw();
    }
  
  }
  var circleArray = [];
  var radius = 5;
  var circleIndex=0;
  for (var i=0 ; i< 90  ; i++){
    for (var j=0 ; j< 52  ; j++){
        var x  = 10 + i *radius*2.5;
        var y  = 10 + j*radius*2.5;
        circleArray.push(new Circle (y,x,radius, circleIndex));
        circleIndex++;
    }
  }
  function animate() {
      //requestAnimationFrame(animate);
      (function() {
      for (var i=0 ; i< circleArray.length ; i++){
        setTimeout( function() {
          circleArray[i].draw()}, 100);
      }
    })();
  }
  
  animate();
