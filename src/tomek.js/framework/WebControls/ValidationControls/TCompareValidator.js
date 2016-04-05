//= require TBaseValidator

/** section: WebControls_ValidationControls
 * class TCompareValidator < TBaseValidator
 * 
 * 
 **/
klass( 'TCompareValidator', TBaseValidator, {
	
	//@Override
	getPublicProperties : function(){
		var arr = this.base();
		arr.push( { name: 'ControlToCompare', type: 'none' },
					{ name: 'ValueToCompare', type: 'object' },
					'Operator' );
		return arr;
	},
	
	setControlToCompare : function( c ){
		if ( typeof c == 'string' ){
			this._ControlToCompareID = c;
		}else{
			this._ControlToCompare = c;
		}
	},
	
	getControlToCompare : function(){
		if ( this._ControlToCompare === null
				&& this._ControlToCompareID !== null
				&& this._ControlToCompareID !== undefined ){
				
			var ctrl = this.findControlByID( this._ControlToCompareID );
			if ( ctrl === null ){
				throw new TException( 'Cannot find control: '+this._ControlToCompareID );
			}
			this.setControlToCompare( ctrl );
			
		}
		return this._ControlToCompare;
	},
	
	//@Override
	performValidation : function(){
		
		var leftValue = this.getControlToValidate().getValue();
		
		var rightValue = null;
		
		if ( this.getControlToCompare() !== null ){
			rightValue = this.getControlToCompare().getValue();
		} else {
			rightValue = this.getValueToCompare();
		}
		
		switch( this.getOperator().toLowerCase().replace( "-", "" ) ){
			
			case 'equals' :
			case 'equal' :
				return leftValue == rightValue;
				break;
			
			case 'notequals' :
			case 'notequal' :
			case 'differ' :
			case 'differs' :
				return leftValue != rightValue;
				break;
			
			case 'greater' :
			case 'greaterthan' :
				return leftValue > rightValue;
				break;
			
			case 'less' :
			case 'lessthan' :
				return leftValue < rightValue;
				break;
			
		}
		return false;
	}
	
});