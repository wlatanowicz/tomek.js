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
        return this.ControlToValidate.Value ? true : false;
    }
}