<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>
	<com:TValidatedForm ID="Form">
		<div>
			<com:TTextBox ID="TB" />
			<com:TRequiredValidator CssClass="err" ControlToValidate="TB" >
				No text in textbox
			</com:TRequiredValidator>
		</div>
	</com:TValidatedForm>
	<com:TButton ID="B" on:Click="SourceTemplateControl.buttonClicked" />
</com:TContent>
	
</template>