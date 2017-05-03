import TemplateControl from "@framework/TemplateControl";
import template from "./ValidatedForm.tpl";

export default class ValidatedForm extends TemplateControl
{
	template = template;

	buttonClicked( sender, param )
	{
		var result = this.$('Form').validate();
		if ( result ){
			this.$( 'ValidationPassedLiteral' ).Visible = true;
			this.$( 'ValidationFailedLiteral' ).Visible = false;
		}else{
			this.$( 'ValidationPassedLiteral' ).Visible = false;
			this.$( 'ValidationFailedLiteral' ).Visible = true;
		}
		
		this.$( 'ValidationPassedLiteral' ).render();
		this.$( 'ValidationFailedLiteral' ).render();
	}
	
	checkPasswordLength()
	{
		return this.$('PasswordTB').Text.length === 0
				|| this.$('PasswordTB').Text.length > 6;
	}
}
