
(function(){

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Events = Matter.Events;
var Body = Matter.Body;
var Composite = Matter.Composite;

window.BallPhys = function(w,h){

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
	
	onBilleTouch : function() {},

	run : function() {
		this.firstComposite = Composite.create();
		this.nextComposite = Composite.create();
		this.spawnFirstBall();

		
		var ground = Bodies.rectangle(0, this.height*0.90,this.width*2, this.height/10, { isStatic: true, render:{
			fillStyle:"transparent",
			strokeStyle:"transparent"
		} });

		var wallL = Bodies.rectangle(0, this.height,this.width*0.001, this.height*0.45, { isStatic: true, render:{
			fillStyle:"transparent",
			strokeStyle:"transparent"
		} });

		var wallR = Bodies.rectangle(this.width, this.height,this.width*0.001, this.height*0.45, { isStatic: true, render:{
			fillStyle:"transparent",
			strokeStyle:"transparent"
		} });

		// add all of the bodies to the world
/*		World.add(this.engine.world, [ground,wallL,wallR]);
		*/
		// run the engine
		Engine.run(this.engine);
		
		Events.on(this.engine, "mouseup",  function(e){
			
			if(this.checkBalls(e.mouse.position,this.balls)){
				this.onBilleTouch();
		
			}

		}.bind(this)) 

		this.spawnCursor();
		Matter.Composite.add(this.engine.world,[wallL,wallR,ground,this.firstComposite,this.nextComposite]);
		
		var mouse = this.engine.input.mouse;
		mouse.element.removeEventListener("mousewheel", mouse.mousewheel);
		mouse.element.removeEventListener("DOMMouseScroll", mouse.mousewheel);
		mouse.element.removeEventListener("mousemove",mouse);

		mouse.element.removeEventListener('mousedown', mouse.mousedown);
		//mouse.element.removeEventListener('mouseup', mouse.mouseup);
		mouse.element.removeEventListener('touchmove', mouse.mousemove);
		mouse.element.removeEventListener('touchstart', mouse.mousedown);
		//mouse.element.removeEventListener('touchend', mouse.mouseup);
        
        //element.addEventListener('mousedown', mouse.mousedown);
        //element.addEventListener('mouseup', mouse.mouseup);
        
        //element.addEventListener("mousewheel", mouse.mousewheel);
        //element.addEventListener("DOMMouseScroll", mouse.mousewheel);

        //element.addEventListener('touchmove', mouse.mousemove);
        //element.addEventListener('touchstart', mouse.mousedown);
        //element.addEventListener('touchend', mouse.mouseup);
	},

	addBall : function(x,y,r){
		this.balls.push();
	},

	checkBalls : function(pos){
		if(this.firstBall!=null && this.firstBall.checkPosition(pos)){
			this.firstBall.fade();
			setTimeout(this.spawnNextBall(),1000);
			return true;
		}
		else if(this.nextBall!=null && this.nextBall.checkPosition(pos)){
			this.nextBall.fade();
			setTimeout(this.spawnFirstBall(),1000);
			return true;
		}
		else{
		return false;
		}
	},

	spawnFirstBall : function(){
		//World.clear(this.engine.world,false);
		this.firstBall = new Ball(0-this.width*0.1,this.height*0.50,40,this.engine,this.firstComposite);
		this.nextBall = null;
		Matter.Composite.addBody(this.firstComposite, this.firstBall.circle);
		Body.applyForce(this.firstBall.circle, { x: this.firstBall.circle.position.x, y: this.firstBall.circle.position.y }, {x:0.05,y:0});
	},

	spawnNextBall : function(){
		//World.clear(this.engine.world,false);
		this.nextBall = new Ball(this.width+this.width*0.1,this.height*0.50,40,this.engine,this.nextComposite);
		this.firstBall = null;
		Matter.Composite.addBody(this.nextComposite, this.nextBall.circle);
		Body.applyForce(this.nextBall.circle, { x: this.nextBall.circle.position.x, y: this.nextBall.circle.position.y }, {x:-0.05,y:0});
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


window.Ball = function(x,y,r,engine,composition){
	this.alpha = 1;
	this.composition = composition;
	this.circle = Bodies.circle(x,y,r,{density: 0.0005,frictionAir: 0.006,restitution: 0.4,friction: 0.6,render: {
                        strokeStyle: 'transparent',
                        fillStyle: 'rgba(1,1,1,'+this.alpha+')'
                    }});


};


Ball.prototype.fade = function() {
	
	setTimeout(function(){
		this.alpha-=0.1;
		if(this.alpha<0)this.alpha=0;
		this.circle.render.fillStyle='rgba(1,1,1,'+this.alpha+')';
		if(this.alpha > 0)this.fade();
		else{
			this.circle.circleRadius = 0;
			World.clear(this.composition,false);
		}
	}.bind(this),50);

		
	
};

Ball.prototype.checkPosition = function(pos) {

	return(Math.pow(pos.x - this.circle.position.x,2) + Math.pow(pos.y - this.circle.position.y,2) < Math.pow(this.circle.circleRadius,2));
};



})() ;
