
(function(){

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Events = Matter.Events;

window.BallPhys = function(w,h){
	console.log("ball engine created");
	this.firstBall;
	this.nextBall;
			this.engine = Engine.create(document.getElementById('header'),{
			render:{
				options:{
					wireframes:false,
					width:w,
					height:h

				}
			}
		});
		this.width = this.engine.render.options.width;
		this.height = this.engine.render.options.height;
		this.engine.world.bounds.min.x = -1000;
		this.engine.world.bounds.min.y = -1000;
		this.engine.world.bounds.max.x = 20000;
		this.engine.world.bounds.max.y = 1000;
		Matter.Render.setBackground ( this.engine.render,  'background: rgba(250, 250, 250,0);' );
        this.engine.render.options.width = 1000;
        this.engine.render.options.wireframes = false;

};


BallPhys.prototype = {
	

	run : function() {
				// create two boxes and a ground


	/*	var boxA = Bodies.circle(this.width*0.3, 200, 50,{density: 0.0005,frictionAir: 0.00006,restitution: 0.4,friction: 0.01,render: {
                        strokeStyle: 'transparent',
                        fillStyle: 'black'
                    }});

		this.boxB = Bodies.circle(this.width*0.7, 200, 20,{render: {
                        strokeStyle: 'transparent',
                        fillStyle: 'black'
                    }});*/

		
		this.spawnFirstBall();

		
		var ground = Bodies.rectangle(0, this.height*0.90,this.width*2, this.height/10, { isStatic: true, render:{
			fillStyle:"transparent",
			strokeStyle:"transparent"
		} });

		// add all of the bodies to the world
		World.add(this.engine.world, [ground]);
		
		// run the engine
		Engine.run(this.engine);
		
		Events.on(this.engine, "mousedown",  function(e){
			if(this.checkBalls(e.mouse.position,this.balls))this.spawnNextBall();
		}.bind(this)) 

		this.spawnCursor();
	},

	addBall : function(x,y,r){
		this.balls.push();
	},

	checkBalls : function(pos){
		if(this.firstBall!=null && this.firstBall.checkPosition(pos)){
			this.firstBall.fade();
			setTimeout(this.spawnNextBall(),1000);
			return;
		}
		else if(this.nextBall!=null && this.nextBall.checkPosition(pos)){
			this.nextBall.fade();
			setTimeout(this.spawnFirstBall(),1000);
			return;
		}

	},

	spawnFirstBall : function(){
		this.firstBall = new Ball(this.width*0.3,this.height*0,50);
		this.nextBall = null;
		World.add(this.engine.world, this.firstBall.circle);
	},

	spawnNextBall : function(){
		this.nextBall = new Ball(this.width*0.7,this.height*0,50);
		this.firstBall = null;
		World.add(this.engine.world, this.nextBall.circle);
	},

	spawnCursor : function(){
		var cursor = Bodies.circle(0,0,20,{isStatic: false,render: {
                        strokeStyle: 'transparent',
                        fillStyle: 'transparent'
                    }});

		World.add(this.engine.world, cursor);
		var loop = function(){
			//cursor.position = {x:this.engine.input.mouse.position.x,y:this.engine.input.mouse.position.y};
		
			requestAnimationFrame(loop);
		}.bind(this);requestAnimationFrame(loop);
	}



} ;


window.Ball = function(x,y,r,engine){
	this.alpha = 0.5;
	this.circle = Bodies.circle(x,y,r,{density: 0.0005,frictionAir: 0.00006,restitution: 0.4,friction: 0.01,render: {
                        strokeStyle: 'transparent',
                        fillStyle: 'rgba(1,1,1,'+this.alpha+')'
                    }});


};


Ball.prototype.fade = function() {
	
	setTimeout(function(){
		this.alpha-=0.1;
		this.circle.render.fillStyle='rgba(1,1,1,'+this.alpha+')';
		if(this.alpha > 0)this.fade();
		else{
			this.circle.circleRadius = 0;
		}
	}.bind(this),50);

		
	
};

Ball.prototype.checkPosition = function(pos) {

	return(Math.pow(pos.x - this.circle.position.x,2) + Math.pow(pos.y - this.circle.position.y,2) < Math.pow(this.circle.circleRadius,2));
};



})() ;
