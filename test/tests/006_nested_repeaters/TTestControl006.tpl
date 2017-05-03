<?xml version="1.0" encoding="UTF-8" ?>

<template xmlns:com='component' xmlns:prop='property' xmlns:on='event' xmlns:temp='stencil'>

<com:Content>
	<com:Repeater ID="Rep" on:ItemCreated="SourceTemplateControl.itemCreated" >
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
					<com:Repeater ID="InnerRep" >
						<temp:Item>
							<com:Control>
								<p class="inneritem inneritem_[%= this.ItemIndex %]" >
									Item_[%= this.DataItem %]
								</p>
							</com:Control>
						</temp:Item>
					</com:Repeater>
				</span>
			</com:Control>
		</temp:Item>
	</com:Repeater>
</com:Content>
	
</template>