function hideSplash() {
  $.mobile.changePage("#home", "fade");
}


$(document).bind("pageinit", function(){
	hideSplash();
});