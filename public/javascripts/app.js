var procJSON = {
	'success' : function(data, form)
	{

	},
	'retry' : function(data, form)
	{
		$(form).trigger('reset');
		alert(data.message);
	},
	'forward' : function(data, form)
	{
		location.href=data.url;
	}
}

$(document).bind("pageinit", function(){
	
	$('#menupanel').on('tap','a',function(e){
		//$(e.target).addClass('active');
	});

	$('.form').submit(function(e){
		e.preventDefault();
		$.mobile.showPageLoadingMsg();
		
		var form = this;
		var action = $(form).prop('action');
		var dt = $(form).serializeArray();

		$.ajax({
			url: action,
			dataType: 'json',
			type: 'post',
			data: dt,
			success: function(data)
			{
				procJSON[data.action](data,form);
				$.mobile.hidePageLoadingMsg();
			},
			error: function(xhr)
			{

			}
		})
	})

});

function hideSplash() {
  //$.mobile.changePage("#home", "fade");
}