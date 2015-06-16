
(function(){

var Engine = Matter.Engine;
var World = Matter.World;
var Bodies = Matter.Bodies;
var bouncy = {
	frictionAir: 0, 
	friction: 0.0001,
	restitution: 0.6,
	mass: 1010
}

window.BallPhys = function(){


};



BallPhys.prototype = {
	
	init : function(w,h){
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
		Matter.Render.setBackground ( this.engine.render,  'background: rgba(250, 250, 250,0);' );
        this.engine.render.options.width = 1000;
        this.engine.render.options.wireframes = false;

        
	},

	run : function() {
				// create two boxes and a ground
		var boxA = Bodies.circle(400, 200, 80,bouncy,{render: {
                        strokeStyle: 'transparent',
                        fillStyle: 'black'
                    }});
		var ground = Bodies.rectangle(0, this.height*0.90,this.width*2, this.height/10, { isStatic: true, render:{
			fillStyle:"transparent",
			strokeStyle:"black"
		} });

		// add all of the bodies to the world
		World.add(this.engine.world, [boxA,ground]);

		// run the engine
		Engine.run(this.engine);

		console.log(Engine);
	}


} ;

})() ;
