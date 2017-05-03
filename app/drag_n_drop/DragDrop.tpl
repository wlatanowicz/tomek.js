<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:Content>
	
	
	<com:Droppable ID="DropZone1"
					on:Drop=".onDrop"
					CssClass="droppable yellow">
		<com:Repeater ID="Repeater1">
			<temp:Item>
				<com:Draggable CustomData="[%= { obj: this.DataItem, source: 'Repeater1' } %]"
								Group="[%= this.DataItem.color.charAt(0).toUpperCase() + this.DataItem.color.slice(1) %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:Draggable>
			</temp:Item>
		</com:Repeater>
	</com:Droppable>
			
	<com:Droppable ID="DropZone2"
					on:Drop=".onDrop"
					Groups='Red'
					CssClass="droppable red">
		<com:Repeater ID="Repeater2">
			<temp:Item>
				<com:Draggable CustomData="[%= { obj: this.DataItem, source: 'Repeater2' } %]"
								Group="[%= this.DataItem.color.charAt(0).toUpperCase() + this.DataItem.color.slice(1) %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:Draggable>
			</temp:Item>
		</com:Repeater>
	</com:Droppable>
			
	<com:Droppable ID="DropZone3"
					on:Drop=".onDrop"
					Groups='Green'
					CssClass="droppable green">
		<com:Repeater ID="Repeater3">
			<temp:Item>
				<com:Draggable CustomData="[%= { obj: this.DataItem, source: 'Repeater3' } %]"
								Group="[%= this.DataItem.color.charAt(0).toUpperCase() + this.DataItem.color.slice(1) %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:Draggable>
			</temp:Item>
		</com:Repeater>
	</com:Droppable>
			
	<com:Droppable ID="DropZone4"
					on:Drop=".onDrop"
					Groups='Blue'
					CssClass="droppable blue">
		<com:Repeater ID="Repeater4">
			<temp:Item>
				<com:Draggable CustomData="[%= { obj: this.DataItem, source: 'Repeater4' } %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:Draggable>
			</temp:Item>
		</com:Repeater>
	</com:Droppable>
			
</com:Content>

</template>