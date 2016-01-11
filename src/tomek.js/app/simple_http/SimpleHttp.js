//= require TTemplateControl
//= require THttp

klass( 'SimpleHttp', TTemplateControl, {
	
	buttonClicked : function( sender, param ){
							
		var http = new THttp( { 'BaseUrl': 'http://api.openweathermap.org/data/2.5/' } );
		
		http.get( 'weather', { 
					'lat' : '35',
					'lon' : '139',
					'appid' : '2de143494c0b295cca9337e1e96b00e0' } )
						.start( function(){
							this.$('TemperatureL').setText( '...' );
							this.render();
						}.bind(this) )
						.success( function( req, response ){
							this.$('TemperatureL').setText( response.main.temp );
							this.render();
						}.bind(this) )
						.error( function( req ){
							alert( 'Error :-(' );
						}.bind(this) );
		
	}
	
} );
