<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	
	<com:TDroppable ID="DropZone1"
					on:Drop=".onDrop"
					CssClass="droppable yellow">
		<com:TRepeater ID="Repeater1">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater1' } %]"
								Group="[%= this.DataItem.color.charAt(0).toUpperCase() + this.DataItem.color.slice(1) %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
	<com:TDroppable ID="DropZone2"
					on:Drop=".onDrop"
					Groups='Red'
					CssClass="droppable red">
		<com:TRepeater ID="Repeater2">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater2' } %]"
								Group="[%= this.DataItem.color.charAt(0).toUpperCase() + this.DataItem.color.slice(1) %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
	<com:TDroppable ID="DropZone3"
					on:Drop=".onDrop"
					Groups='Green'
					CssClass="droppable green">
		<com:TRepeater ID="Repeater3">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater3' } %]"
								Group="[%= this.DataItem.color.charAt(0).toUpperCase() + this.DataItem.color.slice(1) %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
	<com:TDroppable ID="DropZone4"
					on:Drop=".onDrop"
					Groups='Blue'
					CssClass="droppable blue">
		<com:TRepeater ID="Repeater4">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater4' } %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
</com:TContent>

</template>