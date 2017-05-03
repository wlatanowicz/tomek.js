import BaseValidator from "@framework/WebControls/ValidationControls/BaseValidator";

/** section: WebControls_ValidationControls
 * class RequiredValidator < BaseValidator
 * 
 * 
 **/
export default class RequiredValidator extends BaseValidator
{
    //@Override
    performValidation()
    {
        return this.ControlToValidate.Value ? true : false;
    }
}