import TBaseValidator from "@framework/WebControls/ValidationControls/TBaseValidator";

/** section: WebControls_ValidationControls
 * class TRequiredValidator < TBaseValidator
 * 
 * 
 **/
export default class TRequiredValidator extends TBaseValidator
{
	//@Override
	performValidation()
	{
	    console.log(this.ControlToValidate);
	    console.log(this.ControlToValidate.Text);
	    console.log(this.ControlToValidate.Value);
		let ret = this.ControlToValidate.Value ? true : false;
	    console.log(ret);
	    return ret;
	}
}