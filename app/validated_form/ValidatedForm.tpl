<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:Content>
	
	<com:ValidatedForm ID="Form">
		
		<div>
			<com:Label ForControl="LoginTB" Text="Login:" />
			<com:TextBox ID="LoginTB" />
			<com:RequiredValidator CssClass="err" ControlToValidate="LoginTB" >
				No login provided
			</com:RequiredValidator>
			<com:CompareValidator CssClass="err"
								   ControlToValidate="LoginTB"
								   Operator="Not-Equals"
								   ValueToCompare="root" >
				Login 'root' is reserved
			</com:CompareValidator>
		</div>
		
		<div>
			<com:Label ForControl="PasswordTB" Text="Password:" />
			<com:TextBox ID="PasswordTB" />
			<com:RequiredValidator CssClass="err" ControlToValidate="PasswordTB" >
				No password provided
			</com:RequiredValidator>
			<com:CustomValidator CssClass="err" ControlToValidate="PasswordTB"
								  on:Validate=".checkPasswordLength" >
				Password to short
			</com:CustomValidator>
		</div>
		
		<div>
			<com:Label ForControl="ConfirmPasswordTB" Text="Confirm password:" />
			<com:TextBox ID="ConfirmPasswordTB" />
			<com:CompareValidator CssClass="err"
								   ControlToValidate="ConfirmPasswordTB"
								   ControlToCompare="PasswordTB"
								   Operator="Equals">
				Password confirmation does not match
			</com:CompareValidator>
		</div>
		<div>
			<com:Label ForControl="RoleDDL" Text="User role:" />
			<com:DropDownList ID="RoleDDL">
				<com:Option Text="Administrator" Value="admin" />
				<com:Option Text="User" Value="user" />
				<com:Option Text="Guest" Value="guest" />
			</com:DropDownList>
			<com:CompareValidator CssClass="err"
								   ControlToValidate="RoleDDL"
								   ValueToCompare="admin"
								   Operator="NotEquals">
				You cannot create administrators
			</com:CompareValidator>
		</div>
		<div>
			<com:Label ForControl="AgreeCB" Text="Agree to TOS:" />
			<com:CheckBox ID="AgreeCB" />
			<com:RequiredValidator CssClass="err"
									ControlToValidate="AgreeCB">
				TOS agreement is mandatory
			</com:RequiredValidator>
		</div>
		
	</com:ValidatedForm>
	<div>
		<com:Button on:Click=".buttonClicked" Text="Click me!" />
		<com:Literal ID="ValidationPassedLiteral" Text="Validation passed." Visible="false" />
		<com:Literal ID="ValidationFailedLiteral" Text="Validation failed." Visible="false" />
	</div>
			
</com:Content>

</template>