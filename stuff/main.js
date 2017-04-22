
var canvas = document.getElementById('myCanvas');
var c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

/*
c.fillStyle = 'rgba(255, 0 , 0 ,0.5)';
c.fillRect(100,100,100,100);
c.fillStyle = 'rgba(0, 0 , 255 ,0.5)';

c.fillRect(400,100,100,100);
c.fillStyle = 'rgba(0, 255 , 0 ,0.5)';
c.fillRect(300,300,100,100);

//Line
c.beginPath();
c.moveTo(50, 300);
c.lineTo(300, 100);
c.lineTo(400, 300);
c.strokeStyle = "#fa343a"
c.stroke();

for(var i=0; i<300 ; i++){
  var x = Math.random() * window.innerWidth;
  var y = Math.random() * window.innerHeight;

  c.beginPath();
  c.arc(x,y, 50, 0, 2*Math.PI, false); // center, radius,  start and end angles in radians,
  c.strokeStyle='hsl(' + 360 * Math.random() + ', 50%, 50%)';
  c.stroke();
}
*/
/*
*/
function Circle(x, y, dx, dy, radius, fillColor) {
  this.x =x;
  this.y =y;
  this.dx = dx;
  this.dy = dy;
  this.radius = radius;
  this.fillColor = fillColor;

  this.draw = function () {
    c.beginPath();
    c.fillStyle='rgba(255,0,255,0.1)';
    c.arc( this.x , this.y, radius, 0, 2*Math.PI, false); // center, radius,  start and end angles in radians,
    c.lineWidth = 0;
    c.fill();
    c.stroke();
  }

  this.update = function() {
    if(this.x + this.radius > innerWidth || this.x - this.radius < 0){
      this.dx = -this.dx;
    }
    if(this.y + this.radius > innerHeight || this.y - this.radius < 0){
      this.dy = -this.dy;
    }
    this.x += this.dx;
    this.y += this.dy;

    this.draw();
  }

}
var circleArray = [];
for (var i=0 ; i< 100  ; i++){
  var radius = Math.random()*30;
  var x  = Math.random() * (innerWidth - radius *2)  + radius;
  var y  = Math.random() * (innerHeight - radius *2)  + radius;
  var dx = (Math.random() - 0.5) * 10; //velocity
  var dy = (Math.random() - 0.5) * 10; //velocity

  circleArray.push(new Circle (x,y, dx,dy,radius, 'hsl(' + 360 * Math.random() + ', 50%, 50%)'));
}
console.log(circleArray)
function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, innerWidth, innerHeight);
    for (var i=0 ; i< circleArray.length ; i++){
      circleArray[i].update();
    }
}

animate();
