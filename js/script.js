$( document ).ready(function() {
	window.ball = new BallPhys($(window).width(),$(window).height());

	window.ball.run();

	var animationOffset = function(){
		var offset = 0;
		var beginAnimation = function(){
			offset+=1;
			
			$('#header').css('backgroundPosition',offset+'px '+offset+'px');
			requestAnimationFrame(beginAnimation);
		};requestAnimationFrame(beginAnimation);


	}();
});
