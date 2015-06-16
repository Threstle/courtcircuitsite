$( document ).ready(function() {
	window.ball = new BallPhys();
	console.log($(window).width);
	window.ball.init($(window).width(),$(window).height());
	window.ball.run();
});
