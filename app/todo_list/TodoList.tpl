<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	<ul>
		<com:TRepeater ID="ListRepeater">
			<temp:Item>
				<li>
					<com:TCheckBox Model="[%^ this.DataItem.done %]" />
					[%= this.DataItem.description %]
				</li>
			</temp:Item>
		</com:TRepeater>
	</ul>
	
	<div>
		<com:TTextBox ID="NewItemTextBox" />
		<com:TButton on:Click=".buttonClicked" Text="Add" />
	</div>
			
</com:TContent>

</template>