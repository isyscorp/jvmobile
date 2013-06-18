function hideSplash() {
  //$.mobile.changePage("#home", "fade");
}

$(document).bind("pageinit", function(){
	//hideSplash();
	/*
	$('#menupanel').on('click', 'a', function(e){
		e.preventDefault();
		var page = $(this).prop('href');

		$.mobile.changePage("#wall", "slide");
		
		$(this).addClass('active');
		$(this).parent().siblings().find('a').removeClass('active');
		console.log('triggered');
	})
*/
});

$("#home").on("pageinit",function(e){
	console.log('home init');
});

$("#wall").on("pageinit",function(e){
	console.log('wall init');
})