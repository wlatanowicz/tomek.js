//= require TControl

klass( 'TAutoRefresh', TControl, {

	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'Interval', type: 'float', default: 1.0 },
					{ name: 'Running', type: 'bool', default: true }
					);
		return arr;
	},
	
	renderContents : function(){
		this.base();
		this.setupRefresh();
	},
	
	refresh : function(){
		this.render();
	},
	
	setupRefresh : function(){
		if ( this.getRunning() ){
			setTimeout( this.refresh.bind( this ), this.getInterval()*1000.0 );
		}
	}

} );