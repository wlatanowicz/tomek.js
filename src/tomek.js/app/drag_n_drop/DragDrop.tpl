<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:prop='property' xmlns:com='component' xmlns:temp='stencil' xmlns:on='event' >

<com:TContent>
	
	
	<com:TDroppable ID="DropZone1"
					on:Drop=".onDrop"
					CssClass="droppable yellow">
		<com:TRepeater ID="Repeater1">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater1' } %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
	<com:TDroppable ID="DropZone2"
					on:Drop=".onDrop"
					CssClass="droppable yellow">
		<com:TRepeater ID="Repeater2">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater2' } %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
	<com:TDroppable ID="DropZone3"
					on:Drop=".onDrop"
					CssClass="droppable yellow">
		<com:TRepeater ID="Repeater3">
			<temp:Item>
				<com:TDraggable CustomData="[%= { obj: this.DataItem, source: 'Repeater3' } %]"
								CssClass="draggable [%= this.DataItem.color %]">
					[%= this.DataItem.id %]
				</com:TDraggable>
			</temp:Item>
		</com:TRepeater>
	</com:TDroppable>
			
</com:TContent>

</template>