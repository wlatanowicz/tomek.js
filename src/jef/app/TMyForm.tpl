<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil'>

<com:TContent>

<com:TPanel ID="p" Attributes.class="xxx">
	<div>
		<p>
			<com:TTextBox CssClass="form"
						  ID="TextBox"
						  Text="[%= 'Treść ' + Date() %]" />
		</p>
		<p>
			<com:TCheckBox CssClass="form"
						  ID="CheckBox"
						  Checked="false" />
		</p>
		<p>
			<com:TButton CssClass="form"
						  ID="Btn"
						  Text="Kliknij" />
		</p>
	</div>
</com:TPanel>
	
</com:TContent>

</template>