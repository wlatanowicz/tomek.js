//= require TTemplateControl

var TMyForm = TTemplateControl.extend( {
	
	iteration : 0,
	
	copyClicked : function( sender ){
		this.findChildControlByID('TargetTB').Text = this.findChildControlByID('SourceTB').Text;
	},
	
	fillClicked : function( sender ){
		
		this.iteration++;
		
		var a = [];
		
		var num = parseInt( this.findChildControlByID( 'NumberTB' ).Text );
		var step = parseFloat( this.findChildControlByID( 'StepTB' ).Text );
		
		for ( var i=0; i<num; i++ ){
			a.push( {
					i : i,
					n : i*step
				} );
		}
		
		this.findChildControlByID( 'Rep' ).setDataSource( a );
		this.findChildControlByID( 'Panel3' ).render();
	},
	
	innerButtonClicked : function( sender ){
		alert( sender.Text );
	}
	
	
} );
