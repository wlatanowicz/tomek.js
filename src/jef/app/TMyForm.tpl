<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event'>

<com:TContent>

<com:TPanel ID="p" Attributes.class="xxx">
	<div>
		<p>
			<com:TTextBox CssClass="form"
						  ID="TextBox1"
						  Text="[%= 'Treść ' + Date() %]" />
		</p>
		<p>
			<com:TTextBox CssClass="form"
						  ID="TextBox2"
						  Text="aaa" />
		</p>
		<p>
			<com:TCheckBox CssClass="form"
						  ID="CheckBox"
						  Checked="false" />
		</p>
		<p>
			<com:TButton CssClass="form"
						  ID="Btn"
						  Text="Kliknij"
						  on:Click="this.buttonClicked" />
		</p>
	</div>
</com:TPanel>
	
</com:TContent>

</template>