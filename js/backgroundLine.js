      (function () {
          var lastTime = 0;
          var vendors = ['ms', 'moz', 'webkit', 'o'];
          for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
              window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
              window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
          }

          if (!window.requestAnimationFrame) window.requestAnimationFrame = function (callback, element) {
              var currTime = new Date().getTime();
              var timeToCall = Math.max(0, 16 - (currTime - lastTime));
              var id = window.setTimeout(function () {
                  callback(currTime + timeToCall);
              },
              timeToCall);
              lastTime = currTime + timeToCall;
              return id;
          };

          if (!window.cancelAnimationFrame) window.cancelAnimationFrame = function (id) {
              clearTimeout(id);
          };
      }());


// mouse position
var mouseX = Math.random() *700;;
var mouseY = 300;

// nb points
var nbPoints = 2000;

// gaussian curve parameters
var peakHeight = mouseY;
var peakCenter = mouseX;
var bellWidth = 100;
var powBellWidth = 2 * bellWidth * bellWidth;
var dx = bellWidth/nbPoints;

// line parameter
var nbLines = 2;
var lineWidth = 10;
var copyTrY = 200;

// canvas draw
var canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");
ctx.lineCap = "round";

ctx.strokeStyle = "#B2342A";
ctx.lineWidth = lineWidth;

var t = 1;




animate();

canvas.onmousemove = function (e) {
           
    var rect = this.getBoundingClientRect(),
    x = e.clientX - rect.left,
    y = e.clientY - rect.top;
    

	if(t % 100 == 0){
		//mouseX = Math.random() *700;// x
		mouseY = y;
	//	bellWidth = x /2;
	}
};


function gaussianCurve(x,y,a,b){
	var xb = x - peakCenter;
	return peakHeight * Math.exp(-xb*xb / powBellWidth);
}

function animate() {

	if(t> 500) t= 0;
		requestAnimationFrame(animate);

/*	

    if (t < 500) {
        requestAnimationFrame(animate);
    }
   else {
    	t = 0;
    	requestAnimationFrame(animate);
    }*/

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
  
 	var basePeakHeight = mouseY/2*(Math.sin(t/100));
	//peakHeight = /*mouseY  + */10*(Math.sin(t/10));
	peakCenter = t*2 + mouseX;
	
	ctx.beginPath();

	//ctx.fillStyle = "#B2342A80";
	//ctx.fillRect(0,0,canvas.width,canvas.height);


	for(var l = 0; l < nbLines; l++){
		var dY = 100;//100*(l+1);
		
		var prevX = mouseX - 10*bellWidth;
		var prevY = mouseY - dY ;
		
		peakHeight = basePeakHeight + l*10;

			ctx.moveTo(0, prevY+dY);
			ctx.lineTo(prevX, prevY+dY);
		
		
		for(var i =0; i < nbPoints; i++){

			prevX = prevX + i * dx;
			prevY = dY + gaussianCurve(prevX);

			ctx.lineTo(prevX,prevY);
			ctx.moveTo(prevX, prevY);
		}
		
		ctx.globalAlpha = 1.0 ;//- l*0.3;
		ctx.stroke();
	}
	
    t++;
}
