<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:Content>
	<com:ValidatedForm ID="Form">
		<div>
			<com:TextBox ID="TB" />
			<com:RequiredValidator CssClass="err" ControlToValidate="TB" >
				No text in textbox
			</com:RequiredValidator>
		</div>
	</com:ValidatedForm>
	<com:Button ID="B" on:Click="SourceTemplateControl.buttonClicked" />
</com:Content>
	
</template>