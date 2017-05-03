<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:Content>
	<com:Repeater ID="Rep"
				   ShowFooterWhenEmpty="false"
				   ShowHeaderWhenEmpty="false"
				   >
		<temp:Header>
			<com:Control>
				<span class="header">
					Header
				</span>
			</com:Control>
		</temp:Header>
		<temp:Footer>
			<com:Control>
				<span class="footer">
					Footer
				</span>
			</com:Control>
		</temp:Footer>
		<temp:Empty>
			<com:Control>
				<span class="empty">
					Empty
				</span>
			</com:Control>
		</temp:Empty>
		<temp:Item>
			<com:Control>
				<span class="item" id="item_[%= this.ItemIndex %]">
					Item-[%= this.DataItem %]
				</span>
			</com:Control>
		</temp:Item>
	</com:Repeater>
</com:Content>
	
</template>