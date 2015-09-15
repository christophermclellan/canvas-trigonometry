//Set up outer canvas

var circle_canvas 	= 	document.getElementById("canvas_circle"),
	ctx 			= 	circle_canvas.getContext("2d");

// Store central X and Y axis position on canvas, in pixels

var	centerX 		=	circle_canvas.width / 2,
	centerY			= 	circle_canvas.height / 2;


// Defining a Canvas function to draw large container circle on the canvas

function drawCircle(context, x_pos, y_pos, radius, fill_color){
	context.beginPath();
	context.arc(x_pos, y_pos, radius, 0, 2 * Math.PI, false);
	context.fillStyle  	=	fill_color;
	context.fill();
}

drawCircle(ctx, centerX, centerY, 200, 'skyblue');

//An array containing the particle angle directions, in degrees

var particle_angles = [3, 20, 110, 40, 37, 74, 65, 150, 140, 175, 162];


//This function takes an array of angles measured in degrees and converts measurements to radians

function toRadians(angles){
	for(var i=0; i<angles.length; i++){
		angles[i] = angles[i] * (Math.PI / 180);
	}

	return angles;
} 

//Running toRadians on the particle angles array

var angle_radians = toRadians(particle_angles);


//Constructor function for particles, this takes a radian angle and color then provides the full particle object

function smallParticle(angle, color){

	this.sin 		= parseFloat(Math.sin(angle).toFixed(2, 10)) * 200;
	this.cos 		= parseFloat(Math.cos(angle).toFixed(2, 10)) * 200;
	this.x 	 		= centerX;
	this.y 	 		= centerY;
	this.color 		= color;
	this.radius 	= 4;
	this.dir 		= 1;
	this.time 		= 50;
	this.p1 		= {x: this.x + this.cos - (this.radius/2),
				   	   y: this.y - this.sin + (this.radius/2)};
	this.p2 		= {x: this.x - this.cos + (this.radius/2),
				       y: this.y + this.sin - (this.radius/2)};
	this.xDistance 	= this.p1.x - this.p2.x;
	this.yDistance	= this.p2.y - this.p1.y;
	this.xSpeed 	= this.xDistance / this.time;
	this.ySpeed 	= this.yDistance / this.time; 
}

smallParticle.prototype.update = function(){
	if(this.y < this.p1.y || this.y > this.p2.y){
		this.dir *= -1;
	}

	this.x += (this.dir * this.xSpeed);
	this.y -= (this.dir * this.ySpeed);
	drawCircle(ctx, this.x, this.y, this.radius, this.color);
}

var particle1 = new smallParticle(angle_radians[0], 'yellow');
drawCircle(ctx, particle1.x, centerY, particle1.radius, particle1.color);

var particle2 = new smallParticle(angle_radians[1], 'red');
drawCircle(ctx, particle2.x, centerY, particle2.radius, particle2.color);

var particle3 = new smallParticle(angle_radians[2], 'green');
drawCircle(ctx, particle3.x, centerY, particle3.radius, particle3.color);

var particle4 = new smallParticle(angle_radians[3], 'orange');
drawCircle(ctx, particle4.x, centerY, particle4.radius, particle4.color);

var particle5 = new smallParticle(angle_radians[4], 'black');
drawCircle(ctx, particle5.x, centerY, particle5.radius, particle5.color);

var particle6 = new smallParticle(angle_radians[5], 'pink');
drawCircle(ctx, particle6.x, centerY, particle6.radius, particle5.color);

var particle7 = new smallParticle(angle_radians[6], 'blue');
drawCircle(ctx, particle7.x, centerY, particle7.radius, particle5.color);

var particle8 = new smallParticle(angle_radians[7], 'orange');
drawCircle(ctx, particle8.x, centerY, particle8.radius, particle5.color);

var particle9 = new smallParticle(angle_radians[8], 'red');
drawCircle(ctx, particle9.x, centerY, particle9.radius, particle5.color);

var particle10 = new smallParticle(angle_radians[9], 'brown');
drawCircle(ctx, particle10.x, centerY, particle10.radius, particle5.color);

var particle11 = new smallParticle(angle_radians[10], 'grey');
drawCircle(ctx, particle11.x, centerY, particle11.radius, particle5.color);

var moving_particles = [];
moving_particles.push(particle1, particle2, particle3, particle4, particle5, particle6, particle7, particle8, particle9, particle10, particle11);


//global_id is just an arbitrary variable defined for use in the upcoming rAF function

var global_id;

//Function for animating movement of smaller circle(s) within large circle, uses rAF and object keys from above

function animateCircle(particleObject, canvas, context){

	global_id = requestAnimationFrame(function(){
 		animateCircle(particleObject, canvas, context);
 	});
	
	context.clearRect(0, 0, canvas.width, canvas.height);
	drawCircle(ctx, centerX, centerY, 200, 'skyblue');

    for (var i = 0; i < particleObject.length; i++) {
        var myParticle = particleObject[i];
        myParticle.update();
    }
}

animateCircle(moving_particles, circle_canvas, ctx);

