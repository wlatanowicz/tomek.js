<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

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

	<com:TRepeater ID="Rep" >
		<temp:Item>
			<com:TPanel>
				helo [%= this.Parent.DataItem %]
			</com:TPanel>
		</temp:Item>
	</com:TRepeater>

</com:TContent>

</template>