<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
<com:TValidatedForm ID="Form">
		<div>
			<com:TLabel ForControl="LoginTB" Text="Login:" />
			<com:TTextBox ID="LoginTB" />
			<com:TRequiredValidator CssClass="err" ControlToValidate="LoginTB" >
				No login provided
			</com:TRequiredValidator>
			<com:TCompareValidator CssClass="err"
								   ControlToValidate="LoginTB"
								   Operator="Not-Equals"
								   ValueToCompare="root" >
				Login 'root' is reserved
			</com:TCompareValidator>
		</div>
		<div>
			<com:TLabel ForControl="PasswordTB" Text="Password:" />
			<com:TTextBox ID="PasswordTB" />
			<com:TRequiredValidator CssClass="err" ControlToValidate="PasswordTB" >
				No password provided
			</com:TRequiredValidator>
			<com:TCustomValidator CssClass="err" ControlToValidate="PasswordTB"
								  on:Validate=".checkPasswordLength" >
				Password to short
			</com:TCustomValidator>
		</div>
		<div>
			<com:TLabel ForControl="ConfirmPasswordTB" Text="Confirm password:" />
			<com:TTextBox ID="ConfirmPasswordTB" />
			<com:TCompareValidator CssClass="err"
								   ControlToValidate="ConfirmPasswordTB"
								   ControlToCompare="PasswordTB"
								   Operator="Equals">
				Password confirmation does not match
			</com:TCompareValidator>
		</div>
	</com:TValidatedForm>
	<div>
		<com:TButton on:Click=".buttonClicked" Text="Click me!" />
		<com:TLiteral ID="ValidationPassedLiteral" Text="Validation passed." Visible="false" />
		<com:TLiteral ID="ValidationFailedLiteral" Text="Validation failed." Visible="false" />
	</div>
			
</com:TContent>

</template>