<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:TContent>
	<com:TValidatedForm ID="Form">
		<div>
			<com:TTextBox ID="TB" />
			<com:TRequiredValidator ControlToValidate="TB" >
				No text in textbox
			</com:TRequiredValidator>
		</div>
	</com:TValidatedForm>
	<com:TButton on:Click="SourceTemplateControl.buttonClicked" />
</com:TContent>
	
</template>