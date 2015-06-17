$( document ).ready(function() {
	window.ball = new BallPhys($(window).width(),$(window).height());

	window.ball.run();

	// !function(){
	// 	var offset = 0;
	// 	var beginAnimation = function(){
	// 		offset+=1;
			
	// 		$('#header').css('backgroundPosition',offset+'px '+offset+'px');
	// 		requestAnimationFrame(beginAnimation);
	// 	};requestAnimationFrame(beginAnimation);


	// }();

	var scene = $('.scene')[0];
	var parallax = new Parallax(scene);
	// var scene2 = document.getElementById('particles-team');
	// var parallax = new Parallax(scene2);


	ball.onBilleTouch = function(){
		switchBackground();

	}

	$('canvas').scroll(function( event ) {
	  event.stopPropagation();
	  // Do something
	});

	window.ondevicemotion = function(e){

		ball.engine.world.gravity.x = -parallax.ix/2;
	};

	window.onmousemove = function(e){
		ball.engine.world.gravity.x = parallax.ix/2;

	}

	$(window).scroll(function(event) {
	  
	  $(".particle").each(function(i, el) {
	    var el = $(el);

	    if (isScrolledIntoView(el)) {
	    	console.log(el);
	      el.addClass("appear"); 
	    }
	    else{
	    	el.removeClass("appear");
	    }
	  });
	  
	});


	var switchBackground = function(){
		if($('#header').attr('data-color')=='yellow'){
			$('#header').attr('data-color','blue');
		}
		else{
			$('#header').attr('data-color','yellow');	
		}
	}

		function isScrolledIntoView(elem)
	{
	    var $elem = $(elem);
	    var $window = $(window);

	    var docViewTop = $window.scrollTop();
	    var docViewBottom = docViewTop + $window.height();

	    var elemTop = $elem.offset().top;
	    var elemBottom = elemTop + $elem.height();

	    return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
	}
});
